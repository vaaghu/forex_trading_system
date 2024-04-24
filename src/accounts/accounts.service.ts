import {
  BadRequestException,
  Inject,
  Injectable,
  Request,
} from '@nestjs/common';
import { BalanceReturnDto, TopupDto } from './accounts.dto';
import { PrismaClient } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
const prisma = new PrismaClient();

@Injectable()
export class AccountsService {
  @Inject(REQUEST) private request: Request;
  async topup(currency: TopupDto['currency'], amount: TopupDto['amount']) {
    // const user = await prisma.users.findFirst({
    //   select: { id: true },
    // });
    const user = this.request['user'];
    if (!user || !user.id) throw new BadRequestException("user isn't existing");

    let symbol;
    try {
      symbol = await prisma.symbols
        .findFirst({
          where: { symbol: currency },
          select: { symbol: true },
        })
        .then(({ symbol }) => symbol);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new BadRequestException(
          `the provided symbol (${currency}) isn't a valid symbol`,
        );
      } else {
        console.error(error);
      }
    }
    await prisma.user_currency_balances.upsert({
      where: { user_id_symbole: { user_id: user.id, symbol } },
      create: { user_id: user.id, symbol, amount },
      update: { amount: { increment: amount } },
    });

    return;
  }
  async balance(): Promise<BalanceReturnDto> {
    const { id } = this.request['user'];
    if (!id) throw new BadRequestException("user isn't existing");

    const result: BalanceReturnDto = await prisma.users
      .findUnique({
        where: { id },
        select: { user_currency_balances: true },
      })
      .then(({ user_currency_balances }) => {
        const balances: BalanceReturnDto['balances'] = {};
        for (const balance of user_currency_balances) {
          balances[balance.symbol] = balance.amount;
        }
        return { balances };
      });
    return result;
  }
}
