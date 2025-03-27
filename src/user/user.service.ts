import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
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
      } catch (error) {
        throw new Error(`Failed to save photo: ${error.message}`);
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
            console.error('Old photo does not exist:', err.message);
          }
        }
      } catch (error) {
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
