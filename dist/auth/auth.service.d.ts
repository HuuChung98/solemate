import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    signUp(createAuthDto: CreateAuthDto): Promise<"Account created successfully" | "Email already exists" | "Server error">;
    login(userLogin: any): Promise<"Login failed" | {
        access_token: string;
    }>;
}
