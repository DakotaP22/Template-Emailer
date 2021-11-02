import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UploadTemplateRequest } from 'src/request/upload-template.request';
import { Template } from 'src/schemas/template.schema';
import { TemplateService } from 'src/services/template.service';

@Controller('template')
export class TemplateController {
  constructor(private templateSvc: TemplateService) {}

  @Get(':id')
  async getTemplate(@Param('id') template_id: string): Promise<Template> {
    return await this.templateSvc.getTemplate(template_id);
  }
  @Get(':id/attributes')
  async getTemplateAttributes(@Param('id') template_id: string): Promise<string[]> {
    return await this.templateSvc.getTemplateAttributes(template_id);
  }
  @Post(':id')
  async uploadTemplate(@Body() req: UploadTemplateRequest, @Param('id') template_id: string) {
    await this.templateSvc.createTemplate(template_id, req.subject, req.template, req.attributes);
  }

  @Post(':id/render')
  async renderTemplate(@Param('id') template_id: string, @Body() data: any) {
    console.log(data);
    return await this.templateSvc.renderTemplate(template_id, data);
  }
}
