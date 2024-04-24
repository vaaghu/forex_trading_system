import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  FxConversion,
  FxRatesBody,
  FxRatesResponse,
  FxConversionResponse,
} from './app.dto';
import { ApiAcceptedResponse } from '@nestjs/swagger';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @ApiAcceptedResponse({
    status: 200,
    description: 'to check',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('fx-rates')
  @ApiAcceptedResponse({
    status: 200,
    type: FxRatesResponse,
    description: 'Successful response with FX rates.',
  })
  @ApiAcceptedResponse({ status: 200, type: FxRatesResponse })
  async fxRates(@Body() body: FxRatesBody): Promise<FxRatesResponse> {
    return await this.appService.fxRates(body.fromCurrency, body.toCurrency);
  }

  @Post('fx-conversion')
  @ApiAcceptedResponse({
    status: 200,
    type: FxConversionResponse,
    description: 'Successful response with FX conversion.',
  })
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
