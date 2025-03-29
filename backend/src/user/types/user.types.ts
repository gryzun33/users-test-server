import { User } from '@prisma/client';

export type PaginatedUsersResponse = {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
};
