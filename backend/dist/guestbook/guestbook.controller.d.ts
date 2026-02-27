import { GuestbookService, GuestbookEntry } from './guestbook.service';
export declare class GuestbookController {
    private service;
    constructor(service: GuestbookService);
    list(): Promise<GuestbookEntry[]>;
    create(body: {
        name: string;
        message: string;
    }): Promise<GuestbookEntry>;
}
