import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { WebBeaconService } from 'src/services/web-beacon.service';

@Controller()
export class BeaconController {
  constructor(private beaconSvc: WebBeaconService) {}

  @Get()
  async getBeacon(@Res() res: Response) {
    const filepath = await this.beaconSvc.getBeaconPath('test-id');
    res.sendFile(filepath);
  }
}
