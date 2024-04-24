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
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    name: 'fromCurrency',
    type: 'string',
    minLength: 3,
    maxLength: 4,
    example: 'USD',
    examples: ['INR', 'JPY'],
  })
  fromCurrency: string;

  @ValidateCurrency()
  @ApiProperty({
    name: 'toCurrency',
    type: 'string',
    minLength: 3,
    maxLength: 4,
    example: 'JPY',
    examples: ['INR', 'USD'],
  })
  toCurrency: string;
}

export class FxRatesResponse {
  @IsUUID()
  @ApiProperty({
    name: 'quoteId',
    type: 'uuid',
    example: '24292b90-4eeb-45ce-acac-bb340de3ce9d',
    description: 'Unique identifier for the FX rate quote.',
  })
  quoteId: UUID;

  @IsNumber()
  @ApiProperty({
    name: 'expiry_at',
    type: 'number',
    example: new Date().getTime(),
    description:
      'Unix timestamp indicating the expiration time of the FX rate quote.',
  })
  expiry_at: number;
}

export class FxConversion extends FxRatesBody {
  @IsUUID()
  @ApiProperty({
    name: 'quoteId',
    type: 'uuid',
    example: '24292b90-4eeb-45ce-acac-bb340de3ce9d',
    description: 'Unique identifier for the FX rate quote.',
  })
  quoteId: UUID;

  @IsNumber()
  @Min(1)
  @ApiProperty({
    name: 'amount',
    type: 'number',
    example: 100,
    minimum: 1,
  })
  amount: number;
}

export class FxConversionResponse {
  @IsNumber()
  @ApiProperty({
    name: 'convertedAmount',
    type: 'number',
    example: 100,
    minimum: 1,
  })
  convertedAmount: number;

  @ValidateCurrency()
  @ApiProperty({
    name: 'currency',
    type: 'string',
    minLength: 3,
    maxLength: 4,
    example: 'USD',
    examples: ['INR', 'JPY'],
  })
  currency: string;
}
