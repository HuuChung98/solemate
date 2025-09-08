import { CouponsService } from './coupons.service';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    getCoupons(token: string): Promise<"Error authentication" | {
        id: bigint;
        code: string;
        rule: import(".prisma/client").Prisma.JsonValue;
        starts_at: Date;
        ends_at: Date;
        max_redemptions: number;
        created_at: Date;
    }[]>;
}
