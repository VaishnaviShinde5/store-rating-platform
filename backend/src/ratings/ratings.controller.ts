import { Controller, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { SubmitRatingDto, UpdateRatingDto } from './ratings.dto';
import { JwtAuthGuard, RolesGuard, Roles } from '../auth/guards';

@Controller('ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  submit(@Request() req, @Body() dto: SubmitRatingDto) {
    return this.ratingsService.submit(req.user.id, dto);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateRatingDto) {
    return this.ratingsService.update(req.user.id, +id, dto);
  }
}
