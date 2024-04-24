import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FxRatesBody } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('fx-rates')
  async fxRates(@Body() body: FxRatesBody) {
    return await this.appService.fxRates(body.fromCurrency, body.toCurrency);
  }

  @Post('fx-conversion')
  async fxConversion() {
    return await this.appService.fxConversion();
  }
}
