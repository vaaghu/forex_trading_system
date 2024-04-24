import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsAlpha,
  IsUppercase,
  IsUUID,
  IsNumber,
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
