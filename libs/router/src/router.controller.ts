import { Controller, Get, Inject } from '@nestjs/common';
import { RouterService } from './router.service';

@Controller('router')
export class RouterController {
  @Inject()
  private readonly routerService: RouterService;

  @Get()
  public async ping() {
    return {
      msg: await this.routerService.ping(),
    };
  }
}
