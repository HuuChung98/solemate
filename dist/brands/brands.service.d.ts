import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
export declare class BrandsService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getAllBrands(token: any): Promise<"Error authentication" | {
        id: bigint;
        name: string;
        slug: string;
        created_at: Date;
    }[]>;
}
