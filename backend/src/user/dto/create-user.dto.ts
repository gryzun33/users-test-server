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

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  photoFile?: Express.Multer.File | null;

  @IsOptional()
  photo?: string | null;
}
