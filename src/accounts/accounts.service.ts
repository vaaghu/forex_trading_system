import { Injectable } from '@nestjs/common';
import { TopupDto } from './accounts.dto';

@Injectable()
export class AccountsService {
  async topup(currency: TopupDto['currency'], amount: TopupDto['amount']) {
    return currency + amount;
  }
}
