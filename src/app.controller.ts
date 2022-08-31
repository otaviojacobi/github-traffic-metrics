import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  ping(): string {
    return this.appService.ping();
  }

  @Get('trigger')
  async triggerStore(): Promise<string> {
    await this.appService.triggerStore();
    return 'ok';
  }
}
