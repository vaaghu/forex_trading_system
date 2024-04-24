import { IsNumber, Min } from 'class-validator';
import { ValidateCurrency } from 'src/app.dto';

export class TopupDto {
  @ValidateCurrency()
  currency: string;

  @IsNumber()
  @Min(1)
  amount: number;
}

export class BalanceReturnDto {
  balances: { [key: TopupDto['currency']]: TopupDto['amount'] };
}
