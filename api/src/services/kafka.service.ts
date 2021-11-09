import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { QueuedEmailPayload } from 'src/model/payload/queued-email.payload';

@Injectable()
export class KafkaService {
  constructor(@Inject('kafka') private client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('email-queued');
  }

  queueEmail(to: string, template: string, attempts: number, data: any) {
    this.client.emit('email-queued', { to, template, data, attempts });
  }
}
