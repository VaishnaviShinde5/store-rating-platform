import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdatePasswordDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../users/user.entity").UserRole;
            address: string;
        };
    }>;
    updatePassword(req: any, dto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
