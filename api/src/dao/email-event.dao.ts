import { Injectable } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { DocumentNotFoundException } from 'src/exceptions/DocumentNotFoundException';
import { FailedToCreateDocumentException } from 'src/exceptions/FailedToCreateDocumentException';
import { EmailEvent, EmailEventDocument } from 'src/schemas/email-event.schema';
@Injectable()
export class EmailEventDao {
  constructor(@InjectModel(EmailEvent.name) private model: Model<EmailEventDocument>) {}

  async logEvent(email_id: string, type: string) {
    const doc: EmailEvent & Document = await this.model.findById(email_id);
    const event = { type, timestamp: Date.now() };

    if (doc) {
      doc.events.push(event);
      doc.save();
    } else {
      await new this.model({
        _id: email_id,
        events: [event],
      }).save();
    }
  }

  async getEvents(email_id: string) {
    const doc: EmailEvent & Document = await this.model.findById(email_id);
    if (doc) {
      return doc.events;
    } else throw new DocumentNotFoundException();
  }
}
