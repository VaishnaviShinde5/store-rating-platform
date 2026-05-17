import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed, role: UserRole.USER });
    await this.userRepo.save(user);
    return { message: 'Registered successfully' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, address: user.address },
    };
  }

  async updatePassword(userId: number, newPassword: string) {
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userRepo.update(userId, { password: hashed });
    return { message: 'Password updated successfully' };
  }
}
