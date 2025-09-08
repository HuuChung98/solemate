import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class CategoriesService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getCategories(token: any): Promise<"Error authentication" | {
        id: bigint;
        name: string;
        parent_id: bigint;
        slug: string;
        created_at: Date;
    }[]>;
}
