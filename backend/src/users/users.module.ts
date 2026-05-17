import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Rating } from '../ratings/rating.entity';
import { Store } from '../stores/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rating, Store])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
