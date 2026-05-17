import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './users.dto';
import { Rating } from '../ratings/rating.entity';
import { Store } from '../stores/store.entity';
export declare class UsersService {
    private userRepo;
    private ratingRepo;
    private storeRepo;
    constructor(userRepo: Repository<User>, ratingRepo: Repository<Rating>, storeRepo: Repository<Store>);
    createUser(dto: CreateUserDto): Promise<{
        message: string;
        id: number;
    }>;
    listUsers(filters: {
        name?: string;
        email?: string;
        address?: string;
        role?: string;
        sortBy?: string;
        order?: 'ASC' | 'DESC';
    }): Promise<User[]>;
    getUserDetail(id: number): Promise<User | {
        storeRating: number;
        id: number;
        name: string;
        email: string;
        password: string;
        address: string;
        role: UserRole;
        ratings: Rating[];
        stores: Store[];
        createdAt: Date;
    } | null>;
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalStores: number;
        totalRatings: number;
    }>;
}
