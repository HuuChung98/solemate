import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { PrismaClient } from '@prisma/client';
export declare class CouponsService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
