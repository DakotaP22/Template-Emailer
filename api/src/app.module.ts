import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BeaconController } from './controllers/beacon.controller';
import { EmailController } from './controllers/email.controller';
import { TemplateController } from './controllers/template.controller';
import { EmailEventDao } from './dao/email-event.dao';
import { EmailDao } from './dao/email.dao';
import { EmailEvent, EmailEventSchema } from './schemas/email-event.schema';
import { Email, EmailSchema } from './schemas/email.schema';
import { Template, TemplateSchema } from './schemas/template.schema';
import { EmailService } from './services/email.service';
import { TemplateService } from './services/template.service';
import { WebBeaconService } from './services/web-beacon.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './properties/.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_ADDR),
    MongooseModule.forFeature([
      { name: EmailEvent.name, schema: EmailEventSchema },
      { name: Template.name, schema: TemplateSchema },
      { name: Email.name, schema: EmailSchema },
    ]),
  ],
  controllers: [BeaconController, EmailController, TemplateController],
  providers: [WebBeaconService, TemplateService, EmailService, EmailDao, EmailEventDao],
})
export class AppModule {}
