import { StoresService } from './stores.service';
import { CreateStoreDto } from './stores.dto';
export declare class StoresController {
    private storesService;
    constructor(storesService: StoresService);
    create(dto: CreateStoreDto): Promise<{
        message: string;
        id: number;
    }>;
    list(query: any, req: any): Promise<{
        id: number;
        name: string;
        email: string;
        address: string;
        averageRating: number;
        userRating: number | null;
        ratingId: number | null;
    }[]>;
    ownerDashboard(req: any): Promise<{
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
