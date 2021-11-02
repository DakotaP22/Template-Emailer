import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BeaconController } from './controllers/beacon.controller';
import { EmailController } from './controllers/email.controller';
import { TemplateController } from './controllers/template.controller';
import { EmailEvent, EmailEventSchema } from './schemas/email-event.schema';
import { Template, TemplateSchema } from './schemas/template.schema';
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
    ]),
  ],
  controllers: [BeaconController, EmailController, TemplateController],
  providers: [WebBeaconService, TemplateService],
})
export class AppModule {}
