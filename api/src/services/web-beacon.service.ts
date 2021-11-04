import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailEvent, EmailEventDocument } from 'src/schemas/email-event.schema';
import * as Path from 'path';
import { EmailEventDao } from 'src/dao/email-event.dao';

@Injectable()
export class WebBeaconService {
  constructor(private emailEventDao: EmailEventDao) {}

  public async getBeaconPath(email_id: string): Promise<string> {
    const filepath: string = await this.getWebBeaconPath();
    this.logOpenEvent(email_id);
    return filepath;
  }

  private async getWebBeaconPath(): Promise<string> {
    const filepath = Path.join(__dirname, '../resources/tracking-pixel.png');
    return filepath;
  }

  private async logOpenEvent(email_id: string): Promise<void> {
    this.emailEventDao.logEvent(email_id, 'OPEN');
  }
}
