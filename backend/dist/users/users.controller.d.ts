import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<{
        message: string;
        id: number;
    }>;
    list(query: any): Promise<import("./user.entity").User[]>;
    dashboard(): Promise<{
        totalUsers: number;
        totalStores: number;
        totalRatings: number;
    }>;
    detail(id: string): Promise<import("./user.entity").User | {
        storeRating: number;
        id: number;
        name: string;
        email: string;
        password: string;
        address: string;
        role: import("./user.entity").UserRole;
        ratings: import("../ratings/rating.entity").Rating[];
        stores: import("../stores/store.entity").Store[];
        createdAt: Date;
    } | null>;
}
