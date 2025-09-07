import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
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
}
