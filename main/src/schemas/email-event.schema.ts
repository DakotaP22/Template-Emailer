import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EmailEvent {
  @Prop()
  email_id: string;

  @Prop()
  event_type: string;

  @Prop()
  timestamp: number;
}

export type EmailEventDocument = EmailEvent & Document;
export const EmailEventSchema = SchemaFactory.createForClass(EmailEvent);
