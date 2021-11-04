import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as ejs from 'ejs';
import { Model } from 'mongoose';
import { AttributeNotFoundException } from 'src/exceptions/AttributeNotFoundException';
import { DocumentNotFoundException } from 'src/exceptions/DocumentNotFoundException';
import { IdTakenException } from 'src/exceptions/IdTakenException';
import { Template, TemplateDocument } from 'src/schemas/template.schema';

@Injectable()
export class TemplateService {
  constructor(@InjectModel(Template.name) private templateModel: Model<TemplateDocument>) {}

  async createTemplate(id: string, subject: string, template: string, attributes: string[]) {
    // check if id is taken
    const taken: Template = await this.templateModel.findById(id);
    if (taken) throw new IdTakenException();
    else
      await new this.templateModel({
        _id: id,
        subject,
        template,
        attributes,
      }).save();
  }

  async getTemplate(id: string): Promise<Template> {
    const template: Template = await this.templateModel.findById(id);
    if (!template) throw new DocumentNotFoundException();
    else return template;
  }

  async getTemplateAttributes(id: string): Promise<string[]> {
    const template: Template = await this.getTemplate(id);
    if (template.attributes) return template.attributes;
    else throw new AttributeNotFoundException();
  }

  async renderTemplate(id: string, data: any): Promise<[string, string]> {
    const template: Template = await this.getTemplate(id);
    return [template.subject, ejs.render(template.template, data)];
  }
}
