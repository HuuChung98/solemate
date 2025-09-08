"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async signUp(createAuthDto) {
        try {
            const checkUser = await this.prisma.users.findFirst({
                where: {
                    email: createAuthDto.email,
                },
            });
            if (!checkUser) {
                await this.prisma.users.create({ data: createAuthDto });
                return 'Account created successfully';
            }
            else {
                return 'Email already exists';
            }
        }
        catch (error) {
            return 'Server error';
        }
    }
    async login(userLogin) {
        try {
            const { email, password } = userLogin;
            const user = await this.prisma.users.findFirst({ where: { email } });
            if (user?.password_hash !== password) {
                throw new common_1.UnauthorizedException();
            }
            const payload = { email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            return 'Login failed';
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map