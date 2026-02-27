import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly service: GuestbookService) {}

  @Get()
  async list() {
    return this.service.getEntries();
  }

  @Post()
  async create(@Body() body: { name: string; message: string }) {
    return this.service.addEntry({ name: body.name, message: body.message });
  }
}
