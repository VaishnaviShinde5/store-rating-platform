import { RatingsService } from './ratings.service';
import { SubmitRatingDto, UpdateRatingDto } from './ratings.dto';
export declare class RatingsController {
    private ratingsService;
    constructor(ratingsService: RatingsService);
    submit(req: any, dto: SubmitRatingDto): Promise<{
        message: string;
        id: number;
    }>;
    update(req: any, id: string, dto: UpdateRatingDto): Promise<{
        message: string;
    }>;
}
