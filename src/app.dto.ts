import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsAlpha,
  IsUppercase,
  IsUUID,
  IsNumber,
  Min,
} from 'class-validator';
import { UUID } from 'crypto';

export function ValidateCurrency() {
  return function (target: any, propertyKey: string) {
    IsNotEmpty()(target, propertyKey);
    IsString()(target, propertyKey);
    MinLength(3)(target, propertyKey);
    MaxLength(4)(target, propertyKey);
    IsAlpha()(target, propertyKey);
    IsUppercase()(target, propertyKey);
  };
}

export class FxRatesBody {
  @ValidateCurrency()
  fromCurrency: string;

  @ValidateCurrency()
  toCurrency: string;
}

export class FxRatesResponse {
  @IsUUID()
  quoteId: UUID;

  @IsNumber()
  expiry_at: number;
}

// { "quoteId": "12345", "fromCurrency": "USD",
// "toCurrency": "EUR", "amount": 100 }
export class FxConversion extends FxRatesBody {
  @IsUUID()
  quoteId: UUID;

  @IsNumber()
  @Min(1)
  amount: number;
}

export class FxConversionResponse {
  @IsNumber()
  convertedAmount: number;

  @ValidateCurrency()
  currency: string;
}
