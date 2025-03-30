type Gender = 'male' | 'female' | 'other';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: Gender;
  address: string;
  photo: string | null;
};

export type PaginatedUsersResponse = {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
};

export type NewUser = {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: Gender;
  address: string;
  photo: FileList | null;
};
