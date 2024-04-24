import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';

import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [AccountsModule, ScheduleModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
