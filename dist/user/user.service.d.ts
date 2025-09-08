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
    getAddressByUserId(token: any, id: number): Promise<"Error authentication" | {
        id: bigint;
        user_id: bigint;
        line1: string;
        line2: string;
        city: string;
        state: string;
        country: string;
        zip: string;
        is_default: boolean;
        created_at: Date;
    }[]>;
    getPaymentMethodsByUserId(token: any, payload: any): Promise<"Error authentication" | "User not found, please check the user ID again" | {
        message: string;
        id: bigint;
        user_id: bigint;
        psp: string;
        token_last4: string;
        brand: string;
        exp_month: number;
        exp_year: number;
        created_at: Date;
    }>;
}
