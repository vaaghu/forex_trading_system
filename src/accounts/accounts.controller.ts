import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TopupDto, BalanceReturnDto } from './accounts.dto';
import { ApiAcceptedResponse } from '@nestjs/swagger';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  @ApiAcceptedResponse({
    status: 200,
    type: null,
    description: 'to top-up on a paticular currency',
  })
  async topup(@Body() body: TopupDto) {
    return await this.accountsService.topup(body.currency, body.amount);
  }

  @Get('balance')
  @ApiAcceptedResponse({
    status: 200,
    type: BalanceReturnDto,
    description: 'to view the balance',
  })
  async balance(): Promise<BalanceReturnDto> {
    return await this.accountsService.balance();
  }
}
