import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EmailEvent {
  @Prop()
  email_id: string;

  @Prop()
  events: { type: string; timestamp: number }[];
}

export type EmailEventDocument = EmailEvent & Document;
export const EmailEventSchema = SchemaFactory.createForClass(EmailEvent);
