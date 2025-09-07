import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class UserService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getUser(token: any): Promise<{
        id: bigint;
        email: string;
        phone: string;
        password_hash: string;
        mfa_enabled: boolean;
        created_at: Date;
    }[] | "Error authentication">;
}
