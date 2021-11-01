import { Module } from '@nestjs/common';
import { BeaconController } from './controllers/beacon.controller';
import { EmailController } from './controllers/email.controller';
import { TemplateController } from './controllers/template.controller';
import { WebBeaconService } from './services/web-beacon.service';

@Module({
  imports: [],
  controllers: [BeaconController, EmailController, TemplateController],
  providers: [],
})
export class AppModule {}
