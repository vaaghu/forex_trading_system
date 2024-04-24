import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async findOne(mobile: string) {
    return await prisma.users.findFirst({
      where: { mobile },
      select: { id: true, password: true },
    });
  }

  async create(user_name: string, password: string, mobile: string) {
    const user = await prisma.users.findFirst({
      where: { mobile },
      select: { id: true, password: true },
    });
    if (user) {
      throw new BadRequestException(
        'user with same mobile number already exist',
      );
    }
    const { id } = await prisma.users.create({
      data: {
        name: user_name,
        password,
        mobile,
      },
      select: { id: true },
    });
    return { id };
  }
}
