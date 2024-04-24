import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as data from '../utils/data.json';

const main = async () => {
  prisma.symbols.deleteMany({});
  data.map(({ name, symbol }) => {
    return { name, symbol };
  });
  console.log(data);
  await prisma.symbols.createMany({
    data,
  });
};
main();
