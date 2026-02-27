import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

// simple in-memory fallback when no supabase credentials are given
class FakeClient {
  private data: any[] = [];

  from(_table: string) {
    const self = this;
    return {
      select: async () => ({ data: self.data, error: null }),
      insert: async (row: any) => {
        const newRow = { id: self.data.length + 1, ...row, created_at: new Date().toISOString() };
        self.data.unshift(newRow);
        return { data: [newRow], error: null };
      },
      order: function () {
        return this;
      },
    };
  }
}

@Injectable()
export class SupabaseService {
  private client: SupabaseClient | FakeClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor(private config: ConfigService) {
    const supabaseUrl = this.config.get<string>('SUPABASE_URL');
    const supabaseKey = this.config.get<string>('SUPABASE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      this.logger.warn('SUPABASE_URL or SUPABASE_KEY not set, using in-memory fallback');
      this.client = new FakeClient();
    } else {
      this.client = createClient(supabaseUrl, supabaseKey);
    }
  }

  getClient(): SupabaseClient | FakeClient {
    return this.client;
  }
}
