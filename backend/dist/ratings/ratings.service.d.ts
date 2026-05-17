import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { Store } from '../stores/store.entity';
import { SubmitRatingDto, UpdateRatingDto } from './ratings.dto';
export declare class RatingsService {
    private ratingRepo;
    private storeRepo;
    constructor(ratingRepo: Repository<Rating>, storeRepo: Repository<Store>);
    submit(userId: number, dto: SubmitRatingDto): Promise<{
        message: string;
        id: number;
    }>;
    update(userId: number, ratingId: number, dto: UpdateRatingDto): Promise<{
        message: string;
    }>;
}
