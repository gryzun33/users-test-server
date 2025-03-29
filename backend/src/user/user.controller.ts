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
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedUsersResponse } from './types/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '12',
  ): Promise<PaginatedUsersResponse> {
    console.log('page=', typeof page, page);
    console.log('limit=', typeof limit, limit);
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.userService.getAllUsers(pageNumber, limitNumber);
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createUserDto.photoFile = file;
    }

    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photoFile'))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() photoFile: Express.Multer.File,
  ): Promise<User> {
    if (photoFile) {
      updateUserDto.photoFile = photoFile;
    } else if (updateUserDto.deletePhoto) {
      updateUserDto.photoFile = null;
    }

    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
