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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const auth_constants_1 = require("../auth/auth.constants");
let UserService = exports.UserService = class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getUser(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret,
            });
            const data = await this.prisma.users.findMany();
            return data;
        }
        catch (error) {
            return 'Error authentication';
        }
    }
    async getAddressByUserId(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret,
            });
            const data = await this.prisma.user_addresses.findMany({
                where: { user_id: id },
            });
            return data;
        }
        catch (error) {
            return 'Error authentication';
        }
    }
    async getPaymentMethodsByUserId(token, payload) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret,
            });
            const { user_id, token_last4, brand, exp_month, exp_year } = payload;
            const createAt = new Date();
            const checkUser = await this.prisma.users.findFirst({
                where: { id: Number(user_id) },
            });
            if (!checkUser) {
                return 'User not found, please check the user ID again';
            }
            const payloadPayment = {
                user_id: Number(user_id),
                psp: 'stripe',
                token_last4: String(token_last4),
                brand: String(brand),
                exp_month: Number(exp_month),
                exp_year: Number(exp_year),
                created_at: createAt,
            };
            const data = await this.prisma.payment_methods.create({
                data: {
                    ...payloadPayment,
                },
            });
            return { ...data, message: 'Payment successful' };
        }
        catch (error) {
            return 'Error authentication';
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map