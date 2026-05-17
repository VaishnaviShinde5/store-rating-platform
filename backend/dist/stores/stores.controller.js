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
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const stores_service_1 = require("./stores.service");
const stores_dto_1 = require("./stores.dto");
const guards_1 = require("../auth/guards");
let StoresController = class StoresController {
    storesService;
    constructor(storesService) {
        this.storesService = storesService;
    }
    create(dto) {
        return this.storesService.create(dto);
    }
    list(query, req) {
        return this.storesService.listStores(query, req.user?.id);
    }
    ownerDashboard(req) {
        return this.storesService.getOwnerDashboard(req.user.id);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, guards_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stores_dto_1.CreateStoreDto]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('owner-dashboard'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, guards_1.Roles)('store_owner'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoresController.prototype, "ownerDashboard", null);
exports.StoresController = StoresController = __decorate([
    (0, common_1.Controller)('stores'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map