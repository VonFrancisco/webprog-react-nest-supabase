import { SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
declare class FakeClient {
    private data;
    from(_: string): any;
}
export declare class SupabaseService {
    private config;
    private client;
    private readonly logger;
    constructor(config: ConfigService);
    getClient(): SupabaseClient | FakeClient;
}
export {};
