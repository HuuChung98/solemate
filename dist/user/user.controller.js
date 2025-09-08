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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
class FileUploadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
class User {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'userId', type: Number }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'email', type: String }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'password', type: String }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'phone', type: String }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
class PaymentInformation {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'userId', type: Number }),
    __metadata("design:type", Number)
], PaymentInformation.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'token', type: String }),
    __metadata("design:type", String)
], PaymentInformation.prototype, "token_last4", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'brand', type: String }),
    __metadata("design:type", String)
], PaymentInformation.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'expMonth', type: Number }),
    __metadata("design:type", Number)
], PaymentInformation.prototype, "exp_month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'expYear', type: Number }),
    __metadata("design:type", Number)
], PaymentInformation.prototype, "exp_year", void 0);
let UserController = exports.UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    getUser(token) {
        return this.userService.getUser(token);
    }
    getAddressByUserId(token, id) {
        return this.userService.getAddressByUserId(token, +id);
    }
    getPaymentMethodsByUserId(token, payload) {
        return this.userService.getPaymentMethodsByUserId(token, payload);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('address/:id'),
    __param(0, (0, common_1.Headers)('token')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAddressByUserId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PaymentInformation]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getPaymentMethodsByUserId", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map