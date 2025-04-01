import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedUsersResponse, UserResponse } from './types/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '12',
  ): Promise<PaginatedUsersResponse> {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.userService.getAllUsers(pageNumber, limitNumber);
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponse> {
    return this.userService.getUserById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photoFile'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() photoFile: Express.Multer.File,
  ): Promise<UserResponse> {
    if (photoFile) {
      const photoPath = `/uploads/${photoFile.filename}`;
      createUserDto.photo = photoPath;
    }

    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photoFile'))
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() photoFile: Express.Multer.File,
  ): Promise<UserResponse> {
    const { photoDeleted, ...userData } = updateUserDto;
    if (photoDeleted === 'true' && !photoFile) {
      await this.userService.deletePhoto(id);
      userData.photo = null;
    }

    if (photoFile) {
      const photoPath = `/uploads/${photoFile.filename}`;
      userData.photo = photoPath;
    }

    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
