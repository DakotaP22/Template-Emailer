import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class EmailEvent {
  @Prop({ type: Types.ObjectId, auto: false })
  _id: string;

  @Prop()
  events: { type: string; timestamp: number }[];
}

export type EmailEventDocument = EmailEvent & Document;
export const EmailEventSchema = SchemaFactory.createForClass(EmailEvent);
