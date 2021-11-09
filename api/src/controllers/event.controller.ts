import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { QueuedEmailPayload } from 'src/model/payload/queued-email.payload';
import { EmailService } from 'src/services/email.service';

@Controller()
export class EventController {
  constructor(private emailSvc: EmailService) {}

  @MessagePattern('email-queued')
  async QueuedEmailHandler(@Payload() payload: { value: QueuedEmailPayload }) {
    const { to, template, attempts, data } = { ...payload.value };
    try {
      await this.emailSvc.sendTemplatedEmail(to, template, attempts, data, true);
    } catch (err) {
      console.log(err);
    }
  }
}
