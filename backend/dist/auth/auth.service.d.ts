import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../users/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: UserRole;
            address: string;
        };
    }>;
    updatePassword(userId: number, newPassword: string): Promise<{
        message: string;
    }>;
}
