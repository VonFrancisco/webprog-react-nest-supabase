"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SupabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("@nestjs/config");
class FakeClient {
    data = [];
    from(_) {
        const query = {
            select: () => ({ data: this.data, error: null }),
            insert: (row) => {
                const newRow = {
                    id: this.data.length + 1,
                    ...row,
                    created_at: new Date().toISOString(),
                };
                this.data.unshift(newRow);
                return { data: [newRow], error: null };
            },
            order: () => query,
        };
        return query;
    }
}
let SupabaseService = SupabaseService_1 = class SupabaseService {
    config;
    client;
    logger = new common_1.Logger(SupabaseService_1.name);
    constructor(config) {
        this.config = config;
        const supabaseUrl = this.config.get('SUPABASE_URL');
        const supabaseKey = this.config.get('SUPABASE_KEY');
        if (!supabaseUrl || !supabaseKey) {
            this.logger.warn('SUPABASE_URL or SUPABASE_KEY not set, using in-memory fallback');
            this.client = new FakeClient();
        }
        else {
            this.client = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
        }
    }
    getClient() {
        return this.client;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = SupabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map