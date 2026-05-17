"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./user.entity");
const rating_entity_1 = require("../ratings/rating.entity");
const store_entity_1 = require("../stores/store.entity");
let UsersService = class UsersService {
    userRepo;
    ratingRepo;
    storeRepo;
    constructor(userRepo, ratingRepo, storeRepo) {
        this.userRepo = userRepo;
        this.ratingRepo = ratingRepo;
        this.storeRepo = storeRepo;
    }
    async createUser(dto) {
        const exists = await this.userRepo.findOne({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Email already exists');
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hashed });
        await this.userRepo.save(user);
        return { message: 'User created', id: user.id };
    }
    async listUsers(filters) {
        const where = {};
        if (filters.name)
            where.name = (0, typeorm_2.ILike)(`%${filters.name}%`);
        if (filters.email)
            where.email = (0, typeorm_2.ILike)(`%${filters.email}%`);
        if (filters.address)
            where.address = (0, typeorm_2.ILike)(`%${filters.address}%`);
        if (filters.role)
            where.role = filters.role;
        const sortBy = filters.sortBy || 'name';
        const order = filters.order || 'ASC';
        const users = await this.userRepo.find({
            where,
            order: { [sortBy]: order },
            select: ['id', 'name', 'email', 'address', 'role', 'createdAt'],
        });
        return users;
    }
    async getUserDetail(id) {
        const user = await this.userRepo.findOne({ where: { id }, select: ['id', 'name', 'email', 'address', 'role'] });
        if (user?.role === user_entity_1.UserRole.STORE_OWNER) {
            const store = await this.storeRepo.findOne({ where: { ownerId: id } });
            if (store) {
                const ratings = await this.ratingRepo.find({ where: { store: { id: store.id } } });
                const avg = ratings.length ? ratings.reduce((s, r) => s + r.value, 0) / ratings.length : 0;
                return { ...user, storeRating: +avg.toFixed(2) };
            }
        }
        return user;
    }
    async getDashboardStats() {
        const [totalUsers, totalStores, totalRatings] = await Promise.all([
            this.userRepo.count(),
            this.storeRepo.count(),
            this.ratingRepo.count(),
        ]);
        return { totalUsers, totalStores, totalRatings };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __param(2, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map