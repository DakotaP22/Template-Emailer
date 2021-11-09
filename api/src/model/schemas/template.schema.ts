import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Template {
  @Prop({ type: Types.ObjectId, auto: false })
  _id: string;

  @Prop()
  subject: string;

  @Prop()
  template: string;

  @Prop()
  attributes: string[];
}

export type TemplateDocument = Template & Document;
export const TemplateSchema = SchemaFactory.createForClass(Template);
