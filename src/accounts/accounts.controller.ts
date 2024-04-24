import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TopupDto, BalanceReturnDto } from './accounts.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  async topup(@Body() body: TopupDto) {
    return await this.accountsService.topup(body.currency, body.amount);
  }

  @Get('balance')
  async balance(): Promise<BalanceReturnDto> {
    return await this.accountsService.balance();
  }
}
