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
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("./store.entity");
const rating_entity_1 = require("../ratings/rating.entity");
let StoresService = class StoresService {
    storeRepo;
    ratingRepo;
    constructor(storeRepo, ratingRepo) {
        this.storeRepo = storeRepo;
        this.ratingRepo = ratingRepo;
    }
    async create(dto) {
        const exists = await this.storeRepo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Store email already exists');
        const store = this.storeRepo.create(dto);
        await this.storeRepo.save(store);
        return { message: 'Store created', id: store.id };
    }
    async listStores(filters, userId) {
        const where = {};
        if (filters.name)
            where.name = (0, typeorm_2.ILike)(`%${filters.name}%`);
        if (filters.address)
            where.address = (0, typeorm_2.ILike)(`%${filters.address}%`);
        const stores = await this.storeRepo.find({ where, relations: ['ratings', 'ratings.user'] });
        const result = await Promise.all(stores.map(async (store) => {
            const ratings = store.ratings || [];
            const avg = ratings.length ? ratings.reduce((s, r) => s + r.value, 0) / ratings.length : 0;
            const userRating = userId ? ratings.find((r) => r.user?.id === userId) : null;
            return {
                id: store.id,
                name: store.name,
                email: store.email,
                address: store.address,
                averageRating: +avg.toFixed(2),
                userRating: userRating ? userRating.value : null,
                ratingId: userRating ? userRating.id : null,
            };
        }));
        const sortBy = filters.sortBy || 'name';
        const order = filters.order === 'DESC' ? -1 : 1;
        result.sort((a, b) => {
            if (a[sortBy] < b[sortBy])
                return -1 * order;
            if (a[sortBy] > b[sortBy])
                return 1 * order;
            return 0;
        });
        return result;
    }
    async getOwnerDashboard(ownerId) {
        const store = await this.storeRepo.findOne({ where: { ownerId }, relations: ['ratings', 'ratings.user'] });
        if (!store)
            return { store: null, ratings: [], averageRating: 0 };
        const ratings = store.ratings || [];
        const avg = ratings.length ? ratings.reduce((s, r) => s + r.value, 0) / ratings.length : 0;
        return {
            store: { id: store.id, name: store.name, email: store.email, address: store.address },
            ratings: ratings.map((r) => ({
                id: r.id,
                value: r.value,
                userName: r.user?.name,
                userEmail: r.user?.email,
                updatedAt: r.updatedAt,
            })),
            averageRating: +avg.toFixed(2),
        };
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(1, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StoresService);
//# sourceMappingURL=stores.service.js.map