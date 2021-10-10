import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class SeedUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;
}
