import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Store } from './store.entity';
import { Rating } from '../ratings/rating.entity';
import { CreateStoreDto } from './stores.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private storeRepo: Repository<Store>,
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
  ) {}

  async create(dto: CreateStoreDto) {
    const exists = await this.storeRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Store email already exists');
    const store = this.storeRepo.create(dto);
    await this.storeRepo.save(store);
    return { message: 'Store created', id: store.id };
  }

  async listStores(filters: { name?: string; address?: string; sortBy?: string; order?: 'ASC' | 'DESC' }, userId?: number) {
    const where: any = {};
    if (filters.name) where.name = ILike(`%${filters.name}%`);
    if (filters.address) where.address = ILike(`%${filters.address}%`);

    const stores = await this.storeRepo.find({ where, relations: ['ratings', 'ratings.user'] });

    const result = await Promise.all(
      stores.map(async (store) => {
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
      }),
    );

    const sortBy = filters.sortBy || 'name';
    const order = filters.order === 'DESC' ? -1 : 1;
    result.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * order;
      if (a[sortBy] > b[sortBy]) return 1 * order;
      return 0;
    });

    return result;
  }

  async getOwnerDashboard(ownerId: number) {
    const store = await this.storeRepo.findOne({ where: { ownerId }, relations: ['ratings', 'ratings.user'] });
    if (!store) return { store: null, ratings: [], averageRating: 0 };
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
}
