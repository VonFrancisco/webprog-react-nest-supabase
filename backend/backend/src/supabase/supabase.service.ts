/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return */
import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

// simple in-memory fallback when no supabase credentials are given
// This builder mimics the chainable API of the real Supabase client and
// implements a minimal `then` method so it is awaitable.  By returning `any`
// from `getClient()` we avoid type unions that were causing compile errors.
class FakeBuilder {
  private result: any;
  constructor(private data: any[]) {}

  select() {
    // prepare a result for the select
    this.result = { data: this.data, error: null };
    return this;
  }

  insert(row: any) {
    const newRow = {
      id: this.data.length + 1,
      ...row,
      created_at: new Date().toISOString(),
    };
    this.data.unshift(newRow);
    this.result = { data: [newRow], error: null };
    return this;
  }

  order() {
    // ordering is no‑op for the fake client but needs to be chainable
    return this;
  }

  single() {
    if (this.result && Array.isArray(this.result.data)) {
      this.result.data = this.result.data[0];
    }
    return this;
  }

  // make the builder thenable so `await client.from(...).select()` works
  then(resolve: (value: any) => void) {
    resolve(this.result ?? { data: null, error: null });
  }
}

class FakeClient {
  // store rows separately per table name
  private tables: Record<string, any[]> = {};

  from(table: string) {
    if (!this.tables[table]) {
      this.tables[table] = [];
    }
    return new FakeBuilder(this.tables[table]) as any;
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
      this.logger.warn(
        'SUPABASE_URL or SUPABASE_KEY not set, using in-memory fallback',
      );
      this.client = new FakeClient();
    } else {
      this.client = createClient(supabaseUrl, supabaseKey);
    }
  }

  // the return type is loosened to suppress compile‑time unions caused by our
  // fake fallback implementation.  Callers can still rely on the actual
  // SupabaseClient when it exists.
  getClient(): any {
    return this.client;
  }
}
