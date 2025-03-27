import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsString()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  photo: string;
}
