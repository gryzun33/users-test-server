import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  height: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  weight: number;

  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  photo?: string | null;
}
