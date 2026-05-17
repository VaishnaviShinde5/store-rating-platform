import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { Store } from '../stores/store.entity';
import { SubmitRatingDto, UpdateRatingDto } from './ratings.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
  ) {}

  async submit(userId: number, dto: SubmitRatingDto) {
    const store = await this.storeRepo.findOne({ where: { id: dto.storeId } });
    if (!store) throw new NotFoundException('Store not found');
    const exists = await this.ratingRepo.findOne({ where: { user: { id: userId }, store: { id: dto.storeId } } });
    if (exists) throw new BadRequestException('You already rated this store. Update your rating instead.');
    const rating = this.ratingRepo.create({ value: dto.value, user: { id: userId } as any, store });
    await this.ratingRepo.save(rating);
    return { message: 'Rating submitted', id: rating.id };
  }

  async update(userId: number, ratingId: number, dto: UpdateRatingDto) {
    const rating = await this.ratingRepo.findOne({ where: { id: ratingId, user: { id: userId } } });
    if (!rating) throw new NotFoundException('Rating not found');
    rating.value = dto.value;
    await this.ratingRepo.save(rating);
    return { message: 'Rating updated' };
  }
}
