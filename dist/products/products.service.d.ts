import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { PrismaClient } from '@prisma/client';
export declare class ProductsService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getProducts(token: any): Promise<"Error authentication" | {
        id: bigint;
        title: string;
        brand_id: bigint;
        category_id: bigint;
        description: string;
        created_at: Date;
    }[]>;
    getProductById(token: any, id: number): Promise<"Error authentication" | {
        id: bigint;
        product_id: bigint;
        sku: string;
        attributes: import(".prisma/client").Prisma.JsonValue;
        price: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
    }[]>;
}
