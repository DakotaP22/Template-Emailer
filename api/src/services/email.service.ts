import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { EmailEventDao } from 'src/dao/email-event.dao';
import { EmailDao } from 'src/dao/email.dao';
import { FailedToSendEmailException } from 'src/model/exceptions/FailedToSendEmailException';
import { QueuedEmailPayload } from 'src/model/payload/queued-email.payload';
import { EmailEvent, EmailEventDocument } from 'src/model/schemas/email-event.schema';
import { Email, EmailDocument } from 'src/model/schemas/email.schema';
import { KafkaService } from './kafka.service';
import { TemplateService } from './template.service';

@Injectable()
export class EmailService {
  transporter;

  constructor(
    private templateSvc: TemplateService,
    private emailDao: EmailDao,
    private emailEventDao: EmailEventDao,
    private kafkaSvc: KafkaService,
  ) {
    this.transporter = nodemailer.createTransport({
      port: parseInt(process.env.MAIL_PORT),
      host: process.env.MAIL_HOST,
    });
  }

  async sendTemplatedEmail(
    to: string,
    template_id: string,
    attempts: number,
    data: any,
    track?: boolean,
    subject?: string,
  ) {
    try {
      const email_id = await this.createEmailRecord(to, template_id, data);
      let [default_subject, body] = await this.renderTemplate(template_id, data);
      if (track) body = this.getBeacon(email_id) + body;
      if (!subject) subject = default_subject;

      this.sendEmail(to, subject, body)
        .catch(() => this.requeueEmail(to, template_id, attempts + 1, data))
        .finally(() => this.createEmailSentEvent(email_id));
    } catch (err) {
      throw err;
    }
  }

  private createEmailSentEvent(email_id: string) {
    this.emailEventDao.logEvent(email_id, 'SENT').catch(() => console.log('Error Creating Sent Event for ' + email_id));
  }

  private requeueEmail(to: string, template_id: string, attempts: number, data: any) {
    this.kafkaSvc.queueEmail(to, template_id, attempts, data);
  }

  private async createEmailRecord(recipient: string, template_id: string, data): Promise<string> {
    return await this.emailDao.create(recipient, template_id, data);
  }

  private async renderTemplate(template_id, data): Promise<[string, string]> {
    return await this.templateSvc.renderTemplate(template_id, data);
  }

  private getBeacon(email_id: string): string {
    const beacon_uri = process.env.BEACON_URI;
    return `<img src="${beacon_uri}/${email_id}" />`;
  }

  private async sendEmail(to: string, subject: string, html: string) {
    try {
      await this.transporter.sendMail({ to, subject, html, from: process.env.MAIL_SENDER });
    } catch (err) {
      throw new FailedToSendEmailException();
    }
  }
}
