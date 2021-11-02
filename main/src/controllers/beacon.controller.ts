import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { WebBeaconService } from 'src/services/web-beacon.service';

@Controller('beacon')
export class BeaconController {
  constructor(private beaconSvc: WebBeaconService) {}

  @Get(':email-id')
  async getBeacon(@Param('email-id') email_id: string, @Res() res: Response) {
    const filepath = await this.beaconSvc.getBeaconPath(email_id);
    res.sendFile(filepath);
  }
}
