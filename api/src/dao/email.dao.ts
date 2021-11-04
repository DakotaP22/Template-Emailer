import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentNotFoundException } from 'src/exceptions/DocumentNotFoundException';
import { FailedToCreateDocumentException } from 'src/exceptions/FailedToCreateDocumentException';
import { IdTakenException } from 'src/exceptions/IdTakenException';
import { Email, EmailDocument } from 'src/schemas/email.schema';

@Injectable()
export class EmailDao {
  constructor(@InjectModel(Email.name) private model: Model<EmailDocument>) {}

  async create(template_id: string, recipient: string, data: any): Promise<string> {
    try {
      const email: EmailDocument = await new this.model({
        template_id,
        recipient,
        data,
      });
      email.save();
      return email.id;
    } catch (err) {
      throw new FailedToCreateDocumentException();
    }
  }

  async read(id: string) {
    const email: Email = await this.model.findById(id);
    if (email) return email;
    else throw new DocumentNotFoundException();
  }

  async update(id: string, updates: Partial<Email>) {
    const doc: Email = await this.model.findByIdAndUpdate(id, updates);
    if (!doc) throw new DocumentNotFoundException();
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
  }
}
