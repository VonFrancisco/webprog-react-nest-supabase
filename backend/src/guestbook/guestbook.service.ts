import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export interface GuestbookEntry {
  id?: number;
  name: string;
  message: string;
  created_at?: string;
}

@Injectable()
export class GuestbookService {
  constructor(private supabase: SupabaseService) {}

  async getEntries(): Promise<GuestbookEntry[]> {
    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }
    return data as GuestbookEntry[];
  }

  async addEntry(entry: { name: string; message: string }): Promise<GuestbookEntry> {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('guestbook').insert(entry).single();
    if (error) {
      throw error;
    }
    return data as GuestbookEntry;
  }
}
