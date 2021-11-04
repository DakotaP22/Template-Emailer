import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Email {
  @Prop()
  template_id: string;

  @Prop()
  recipient: string;

  @Prop({ type: SchemaTypes.Mixed })
  data: any;
}

export type EmailDocument = Email & Document;
export const EmailSchema = SchemaFactory.createForClass(Email);
