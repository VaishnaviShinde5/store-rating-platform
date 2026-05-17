import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { Rating } from '../ratings/rating.entity';
import { CreateStoreDto } from './stores.dto';
export declare class StoresService {
    private storeRepo;
    private ratingRepo;
    constructor(storeRepo: Repository<Store>, ratingRepo: Repository<Rating>);
    create(dto: CreateStoreDto): Promise<{
        message: string;
        id: number;
    }>;
    listStores(filters: {
        name?: string;
        address?: string;
        sortBy?: string;
        order?: 'ASC' | 'DESC';
    }, userId?: number): Promise<{
        id: number;
        name: string;
        email: string;
        address: string;
        averageRating: number;
        userRating: number | null;
        ratingId: number | null;
    }[]>;
    getOwnerDashboard(ownerId: number): Promise<{
        store: null;
        ratings: never[];
        averageRating: number;
    } | {
        store: {
            id: number;
            name: string;
            email: string;
            address: string;
        };
        ratings: {
            id: number;
            value: number;
            userName: string;
            userEmail: string;
            updatedAt: Date;
        }[];
        averageRating: number;
    }>;
}
