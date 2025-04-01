import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatedUsersResponse, UserResponse } from './types/user.types';
import { unlink } from 'fs/promises';
import * as path from 'path';

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

    const users: UserResponse[] = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
      omit: {
        createdAt: true,
      },
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

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: {
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.prisma.user.create({
      data: createUserDto,
      omit: {
        createdAt: true,
      },
    });
  }

  async updateUser(
    id: string,
    updateUserDto: Omit<UpdateUserDto, 'photoDeleted'>,
  ): Promise<UserResponse> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      omit: {
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.user.delete({ where: { id } });
  }

  async deletePhoto(userId: string): Promise<void> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { photo: null },
      select: { photo: true },
    });
    const photoPath = user.photo;

    if (photoPath) {
      if (photoPath.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', '..', photoPath);
        try {
          await unlink(filePath);
          console.log(`Photo deleted: ${filePath}`);
        } catch (error) {
          console.error(`Error deleting local file: ${error.message}`);
        }
      } else if (photoPath.startsWith('http')) {
        console.log(`Photo stored remotely at: ${photoPath}`);
      }
    }
  }
}
