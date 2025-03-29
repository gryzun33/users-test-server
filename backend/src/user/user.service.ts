import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';
import { PaginatedUsersResponse } from './types/user.types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<PaginatedUsersResponse> {
    const skip = (page - 1) * limit;
    const total = await this.prisma.user.count();

    if (total === 0) {
      return {
        users: [],
        total,
        page: 1,
        totalPages: 0,
      };
    }

    const users: User[] = await this.prisma.user.findMany({
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const currentPage = page > totalPages ? totalPages : page;

    return {
      users,
      total,
      page: currentPage,
      totalPages,
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { photoFile, ...userData } = createUserDto;

    if (photoFile && photoFile.filename) {
      const uploadsDir = path.resolve(__dirname, 'upload');
      const photoPath = path.join(uploadsDir, photoFile.filename);

      try {
        await fs.rename(photoFile.path, photoPath);

        userData.photo = `/uploads/${photoFile.filename}`;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(`Failed to save photo: ${err.message}`);
        }
      }
    }

    return this.prisma.user.create({
      data: userData,
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { photoFile, ...userData } = updateUserDto;

    if (photoFile && photoFile.filename) {
      const uploadsDir = path.resolve(__dirname, 'uploads');
      const photoPath = path.join(uploadsDir, photoFile.filename);

      try {
        await fs.rename(photoFile.path, photoPath);

        userData.photo = `/uploads/${photoFile.filename}`;

        if (userData.photo) {
          const oldPhotoPath = path.resolve(
            __dirname,
            'uploads',
            userData.photo,
          );
          try {
            await fs.access(oldPhotoPath);
            await fs.unlink(oldPhotoPath);
          } catch (err) {
            if (err instanceof Error) {
              console.error('Old photo does not exist:', err.message);
            }
          }
        }
      } catch (error) {
        if (error instanceof Error)
          throw new Error(`Failed to update photo: ${error.message}`);
      }
    } else if (updateUserDto.deletePhoto) {
      userData.photo = null;
    }

    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
