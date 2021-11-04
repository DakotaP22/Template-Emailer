import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { EmailEventDao } from 'src/dao/email-event.dao';
import { EmailDao } from 'src/dao/email.dao';
import { FailedToSendEmailException } from 'src/exceptions/FailedToSendEmailException';
import { EmailEvent, EmailEventDocument } from 'src/schemas/email-event.schema';
import { Email, EmailDocument } from 'src/schemas/email.schema';
import { TemplateService } from './template.service';

@Injectable()
export class EmailService {
  transporter;

  constructor(private templateSvc: TemplateService, private emailDao: EmailDao, private emailEventDao: EmailEventDao) {
    this.transporter = nodemailer.createTransport({
      port: parseInt(process.env.MAIL_PORT),
      host: process.env.MAIL_HOST,
    });
  }

  async sendTemplatedEmail(to: string, template_id: string, data: any, track: boolean, subject?: string) {
    const email_id = await this.createEmailRecord(to, template_id, data);
    let [default_subject, body] = await this.renderTemplate(template_id, data);
    if (track) body = this.getBeacon(email_id) + body;
    if (!subject) subject = default_subject;
    await this.sendEmail(to, subject, body);
    await this.createEmailSentEvent(email_id);
  }

  private async createEmailRecord(recipient: string, template_id: string, data): Promise<string> {
    return await this.emailDao.create(recipient, template_id, data);
  }

  private async createEmailSentEvent(email_id: string) {
    await this.emailEventDao.logEvent(email_id, 'SENT');
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
