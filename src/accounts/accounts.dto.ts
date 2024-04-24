import {
  IsAlpha,
  IsNumber,
  IsString,
  IsUppercase,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class TopupDto {
  @IsString()
  @MinLength(3)
  @MaxLength(4)
  @IsAlpha()
  @IsUppercase()
  currency: string;

  @IsNumber()
  @Min(1)
  amount: number;
}

export class BalanceReturnDto {
  balances: { [key: TopupDto['currency']]: TopupDto['amount'] };
}
