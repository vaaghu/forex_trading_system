import { BadRequestException, Injectable } from '@nestjs/common';
import { TopupDto } from './accounts.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AccountsService {
  async topup(currency: TopupDto['currency'], amount: TopupDto['amount']) {
    const user = await prisma.users.findFirst({
      select: { id: true },
    });
    let symbol;
    try {
      symbol = await prisma.symbols
        .findFirst({
          where: { symbol: currency },
          select: { symbol: true },
        })
        .then(({ symbol }) => symbol);
      console.log(symbol);
    } catch (error) {
      throw new BadRequestException(
        `the provided symbol (${currency}) isn't a valid symbol`,
      );
    }
    await prisma.user_currency_balances.upsert({
      where: { user_id_symbole: { user_id: user.id, symbol } },
      create: { user_id: user.id, symbol, amount },
      update: { amount: { increment: amount } },
    });

    return;
  }
}
