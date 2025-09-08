import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { PrismaClient } from '@prisma/client';
export declare class InventoryService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getInventory(token: any): Promise<"Error authentication" | {
        variant_id: bigint;
        stock_on_hand: number;
        reserved: number;
        threshold: number;
        updated_at: Date;
    }[]>;
}
