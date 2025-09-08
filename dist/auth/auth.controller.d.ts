import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
declare class userType {
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createAuthDto: CreateAuthDto): Promise<"Account created successfully" | "Email already exists" | "Server error">;
    login(userLogin: userType): Promise<"Login failed" | {
        access_token: string;
    }>;
}
export {};
