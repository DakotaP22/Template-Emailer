import { Body, Controller, Param, Post } from '@nestjs/common';
import { EmailService } from 'src/services/email.service';

@Controller('email')
export class EmailController {
  constructor(private emailSvc: EmailService) {}

  @Post(':email/:template_id')
  async sendEmail(@Param('email') email: string, @Param('template_id') template_id: string, @Body() data: any) {
    await this.emailSvc.sendTemplatedEmail(email, template_id, data, true);
  }
}
