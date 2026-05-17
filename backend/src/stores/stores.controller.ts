import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './stores.dto';
import { JwtAuthGuard, RolesGuard, Roles } from '../auth/guards';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateStoreDto) {
    return this.storesService.create(dto);
  }

  @Get()
  list(@Query() query: any, @Request() req) {
    return this.storesService.listStores(query, req.user?.id);
  }

  @Get('owner-dashboard')
  @UseGuards(RolesGuard)
  @Roles('store_owner')
  ownerDashboard(@Request() req) {
    return this.storesService.getOwnerDashboard(req.user.id);
  }
}
