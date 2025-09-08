import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
declare class PaymentInformation {
    user_id: number;
    token_last4: string;
    brand: string;
    exp_month: number;
    exp_year: number;
}
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getUser(token: string): Promise<{
        id: bigint;
        email: string;
        phone: string;
        password_hash: string;
        mfa_enabled: boolean;
        created_at: Date;
    }[] | "Error authentication">;
    getAddressByUserId(token: string, id: string): Promise<"Error authentication" | {
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
    getPaymentMethodsByUserId(token: string, payload: PaymentInformation): Promise<"Error authentication" | "User not found, please check the user ID again" | {
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
export {};
