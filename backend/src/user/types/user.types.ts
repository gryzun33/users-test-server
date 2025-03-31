import { User } from '@prisma/client';

export type PaginatedUsersResponse = {
  users: UserResponse[];
  total: number;
  page: number;
  totalPages: number;
};

export type UserResponse = Omit<User, 'createdAt'>;
