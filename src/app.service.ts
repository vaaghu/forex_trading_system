import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { FxRatesBody, FxRatesResponse } from './app.dto';
import { UUID, randomUUID } from 'crypto';
import { env } from 'process';

const rates: { [key: string]: any } = {};
const EXPIRE_IN = 1000 * 60;
const quote: {
  [key: UUID]: {
    quoteId: FxRatesResponse['quoteId'];
    expiry_at: FxRatesResponse['expiry_at'];
    fromCurrency: FxRatesBody['fromCurrency'];
    toCurrency: FxRatesBody['toCurrency'];
    rate: number;
  };
} = {};

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async fxRates(
    fromCurrency: FxRatesBody['fromCurrency'],
    toCurrency: FxRatesBody['toCurrency'],
  ): Promise<FxRatesResponse> {
    const quoteId = randomUUID();
    const expiry_at = new Date().getTime() + EXPIRE_IN;
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    quote[quoteId] = { quoteId, expiry_at, fromCurrency, toCurrency, rate };

    console.log(quote);
    return { quoteId, expiry_at };
  }

  async fxConversion() {
    return 'fxConversion';
  }

  async getExchangeRate(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number> {
    const rateKeyName = '5. Exchange Rate';
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${env['API_KEY']}`;
    console.log(url);
    try {
      if (new Date().getTime() < rates[fromCurrency][toCurrency]?.expires_at) {
        return rates[fromCurrency][toCurrency][rateKeyName];
      } else {
        throw new TypeError('not in memory');
      }
    } catch (error) {
      if (error instanceof TypeError) {
        let { data } = await firstValueFrom(
          this.http.get(url).pipe(
            catchError((error) => {
              console.error(error);
              throw 'An error happened!';
            }),
          ),
        );
        data = data['Realtime Currency Exchange Rate'];

        if (!rates[fromCurrency]) {
          rates[fromCurrency] = {};
        }
        rates[fromCurrency][toCurrency] = {
          ...data,
          expires_at: new Date().getTime() + 30 * 1000,
        };

        if (!data[rateKeyName]) {
          throw new BadRequestException("couldn't get Exchange Rate");
        }
      } else {
        console.error(error);
        throw new BadRequestException("couldn't able to fetch");
      }
    }
    return rates[fromCurrency][toCurrency][rateKeyName];
  }
}
