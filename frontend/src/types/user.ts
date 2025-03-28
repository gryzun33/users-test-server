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
