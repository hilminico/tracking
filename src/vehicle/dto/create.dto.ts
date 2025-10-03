// src/modules/auth/dto/register.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;

  @IsString()
  licensePlate: string;

  @IsString()
  phone: string;

  @IsString()
  customerId: string;

}