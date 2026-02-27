import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GuestbookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
