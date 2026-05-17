import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 400)
  address: string;

  @IsString()
  @Length(8, 16)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
