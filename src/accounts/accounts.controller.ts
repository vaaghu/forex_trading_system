import { Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  topup() {
    return 'topup';
  }

  @Get('balance')
  balance() {
    return 'balance';
  }
}
