import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface Entry {
  id?: number;
  name: string;
  message: string;
  inserted_at?: string;
}

@Injectable()
export class GuestbookService {
  // use `any` generics since we don't have a full typed database schema
  private supabase: SupabaseClient<any, any>;

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_KEY');
    if (!url || !key) {
      throw new Error('Supabase URL/key not provided in environment');
    }
    this.supabase = createClient(url, key);
  }

  async getEntries(): Promise<Entry[]> {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('inserted_at', { ascending: false });
    if (error) {
      throw error;
    }
    return data || [];
  }

  async addEntry(entry: Entry): Promise<Entry[]> {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert(entry)
      .select();
    if (error) {
      throw error;
    }
    return data || [];
  }
}
