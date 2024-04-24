import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { ValidateCurrency } from 'src/app.dto';

export class TopupDto {
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

export class BalanceReturnDto {
  @ApiProperty({
    name: 'balances',
    type: 'object',
    additionalProperties: {
      type: 'number',
      example: 12,
      minimum: 0,
      description: "currency to it's amount",
    },
    description: 'Object containing balances for different currencies.',
    example: { USD: 100, INR: 152, JPY: 41513 },
  })
  balances: { [key: TopupDto['currency']]: TopupDto['amount'] };
}
