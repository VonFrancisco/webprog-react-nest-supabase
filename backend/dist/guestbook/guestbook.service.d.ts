import { SupabaseService } from '../supabase/supabase.service';
export interface GuestbookEntry {
    id?: number;
    name: string;
    message: string;
    created_at?: string;
}
export declare class GuestbookService {
    private supabase;
    constructor(supabase: SupabaseService);
    getEntries(): Promise<GuestbookEntry[]>;
    addEntry(entry: {
        name: string;
        message: string;
    }): Promise<GuestbookEntry>;
}
