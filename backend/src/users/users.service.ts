import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './users.dto';
import { Rating } from '../ratings/rating.entity';
import { Store } from '../stores/store.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already exists');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    await this.userRepo.save(user);
    return { message: 'User created', id: user.id };
  }

  async listUsers(filters: { name?: string; email?: string; address?: string; role?: string; sortBy?: string; order?: 'ASC' | 'DESC' }) {
    const where: any = {};
    if (filters.name) where.name = ILike(`%${filters.name}%`);
    if (filters.email) where.email = ILike(`%${filters.email}%`);
    if (filters.address) where.address = ILike(`%${filters.address}%`);
    if (filters.role) where.role = filters.role;

    const sortBy = filters.sortBy || 'name';
    const order = filters.order || 'ASC';

    const users = await this.userRepo.find({
      where,
      order: { [sortBy]: order },
      select: ['id', 'name', 'email', 'address', 'role', 'createdAt'],
    });
    return users;
  }

  async getUserDetail(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, select: ['id', 'name', 'email', 'address', 'role'] });
    if (user?.role === UserRole.STORE_OWNER) {
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
}
