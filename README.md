# Finmo Backend Engineer Assignment

a Forex Trading System using Nest.js

## setup used

- nodejs 18.17.1
- pnpm 9.0.5
- psql (PostgreSQL) 14.10

## Installation

```bash
$ pnpm install
```

or

```bash
$ npm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

or

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Env

```
  API_KEY=******
  DATABASE_URL="postgresql://vaaghu:*****@localhost:5432/finmo?schema=public"
```

## Other commands

interactive tables

```bash
  npx prisma studio
```

To seed the db

```bash
  npx prisma db seed
```

got all the currency AlphabeticCode from this [git repo](https://github.com/datasets/currency-codes/blob/master/data/codes-all.csv)

## License

Nest is [MIT licensed](LICENSE).
