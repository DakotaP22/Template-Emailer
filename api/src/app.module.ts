import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { BeaconController } from './controllers/beacon.controller';
import { EmailController } from './controllers/email.controller';
import { EventController } from './controllers/event.controller';
import { TemplateController } from './controllers/template.controller';
import { EmailEventDao } from './dao/email-event.dao';
import { EmailDao } from './dao/email.dao';
import { EmailEvent, EmailEventSchema } from './model/schemas/email-event.schema';
import { Email, EmailSchema } from './model/schemas/email.schema';
import { Template, TemplateSchema } from './model/schemas/template.schema';
import { EmailService } from './services/email.service';
import { KafkaService } from './services/kafka.service';
import { TemplateService } from './services/template.service';
import { WebBeaconService } from './services/web-beacon.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './properties/.env',
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: 'mail-consumer',
          },
        },
      },
    ]),
    MongooseModule.forRoot(process.env.DB_ADDR),
    MongooseModule.forFeature([
      { name: EmailEvent.name, schema: EmailEventSchema },
      { name: Template.name, schema: TemplateSchema },
      { name: Email.name, schema: EmailSchema },
    ]),
  ],
  controllers: [BeaconController, EmailController, TemplateController, EventController],
  providers: [WebBeaconService, TemplateService, EmailService, KafkaService, EmailDao, EmailEventDao],
})
export class AppModule {}
