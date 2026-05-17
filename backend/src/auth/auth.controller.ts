import { Controller, Post, Body, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdatePasswordDto } from './auth.dto';
import { JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-password')
  updatePassword(@Request() req, @Body() dto: UpdatePasswordDto) {
    return this.authService.updatePassword(req.user.id, dto.newPassword);
  }
}
