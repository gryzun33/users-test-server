import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PaginatedUsersResponse, UserResponse } from './types/user.types';

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
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      omit: {
        createdAt: true,
      },
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
