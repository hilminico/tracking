// src/modules/auth/dto/register.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}