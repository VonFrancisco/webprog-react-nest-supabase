import { Module } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { GuestbookController } from './guestbook.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [GuestbookController],
  providers: [GuestbookService, SupabaseService],
})
export class GuestbookModule {}
