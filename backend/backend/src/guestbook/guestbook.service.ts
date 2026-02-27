import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import type { SupabaseClient } from '@supabase/supabase-js';

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
    // the service returns `any` so we assert to the real Supabase client owned
    // by the library; this silences numerous eslint unsafe-* errors below.
    const client = this.supabase.getClient() as SupabaseClient;
    const { data, error } = await client
      .from<GuestbookEntry>('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }
    return data as GuestbookEntry[];
  }

  async addEntry(entry: {
    name: string;
    message: string;
  }): Promise<GuestbookEntry> {
    const client = this.supabase.getClient() as SupabaseClient;
    const { data, error } = await client
      .from<GuestbookEntry>('guestbook')
      .insert(entry)
      .single();
    if (error) {
      throw error;
    }
    return data as GuestbookEntry;
  }
}
