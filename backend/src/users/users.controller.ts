import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { JwtAuthGuard, RolesGuard, Roles } from '../auth/guards';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  @Roles('admin')
  list(@Query() query: any) {
    return this.usersService.listUsers(query);
  }

  @Get('dashboard')
  @Roles('admin')
  dashboard() {
    return this.usersService.getDashboardStats();
  }

  @Get(':id')
  @Roles('admin')
  detail(@Param('id') id: string) {
    return this.usersService.getUserDetail(+id);
  }
}
