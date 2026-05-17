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
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rating_entity_1 = require("./rating.entity");
const store_entity_1 = require("../stores/store.entity");
let RatingsService = class RatingsService {
    ratingRepo;
    storeRepo;
    constructor(ratingRepo, storeRepo) {
        this.ratingRepo = ratingRepo;
        this.storeRepo = storeRepo;
    }
    async submit(userId, dto) {
        const store = await this.storeRepo.findOne({ where: { id: dto.storeId } });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        const exists = await this.ratingRepo.findOne({ where: { user: { id: userId }, store: { id: dto.storeId } } });
        if (exists)
            throw new common_1.BadRequestException('You already rated this store. Update your rating instead.');
        const rating = this.ratingRepo.create({ value: dto.value, user: { id: userId }, store });
        await this.ratingRepo.save(rating);
        return { message: 'Rating submitted', id: rating.id };
    }
    async update(userId, ratingId, dto) {
        const rating = await this.ratingRepo.findOne({ where: { id: ratingId, user: { id: userId } } });
        if (!rating)
            throw new common_1.NotFoundException('Rating not found');
        rating.value = dto.value;
        await this.ratingRepo.save(rating);
        return { message: 'Rating updated' };
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __param(1, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map