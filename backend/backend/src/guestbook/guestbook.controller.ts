import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuestbookService, GuestbookEntry } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private service: GuestbookService) {}

  @Get()
  async list(): Promise<GuestbookEntry[]> {
    return this.service.getEntries();
  }

  @Post()
  async create(
    @Body() body: { name: string; message: string },
  ): Promise<GuestbookEntry> {
    return this.service.addEntry(body);
  }
}
