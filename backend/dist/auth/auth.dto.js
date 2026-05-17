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
exports.UpdatePasswordDto = exports.RegisterDto = exports.LoginDto = void 0;
const class_validator_1 = require("class-validator");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RegisterDto {
    name;
    email;
    address;
    password;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 60),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(400, 400, { message: 'Address must be max 400 characters' }),
    (0, class_validator_1.Length)(1, 400),
    __metadata("design:type", String)
], RegisterDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 16),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
        message: 'Password must contain at least one uppercase letter and one special character',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
class UpdatePasswordDto {
    newPassword;
}
exports.UpdatePasswordDto = UpdatePasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(8, 16),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
        message: 'Password must contain at least one uppercase letter and one special character',
    }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
//# sourceMappingURL=auth.dto.js.map