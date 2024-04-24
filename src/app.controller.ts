import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  FxConversion,
  FxRatesBody,
  FxRatesResponse,
  FxConversionResponse,
} from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('fx-rates')
  async fxRates(@Body() body: FxRatesBody): Promise<FxRatesResponse> {
    return await this.appService.fxRates(body.fromCurrency, body.toCurrency);
  }

  @Post('fx-conversion')
  async fxConversion(
    @Body() body: FxConversion,
  ): Promise<FxConversionResponse> {
    return await this.appService.fxConversion(
      body.quoteId,
      body.fromCurrency,
      body.toCurrency,
      body.amount,
    );
  }
}
