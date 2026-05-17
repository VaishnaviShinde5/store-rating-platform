import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(400, 400, { message: 'Address must be max 400 characters' })
  @Length(1, 400)
  address: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  newPassword: string;
}
