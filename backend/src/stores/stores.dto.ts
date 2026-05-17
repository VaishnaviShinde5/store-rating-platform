import { IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 400)
  address: string;

  @IsNumber()
  @IsOptional()
  ownerId?: number;
}
