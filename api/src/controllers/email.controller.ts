import { Body, Controller, Param, Post } from '@nestjs/common';
import { EmailService } from 'src/services/email.service';
import { KafkaService } from 'src/services/kafka.service';

@Controller('email')
export class EmailController {
  constructor(private emailSvc: EmailService, private kafkaSvc: KafkaService) {}

  @Post(':email/:template_id')
  sendEmail(@Param('email') email: string, @Param('template_id') template_id: string, @Body() data: any) {
    this.kafkaSvc.queueEmail(email, template_id, 0, data);
  }
}
