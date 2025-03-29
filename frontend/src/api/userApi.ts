import { PaginatedUsersResponse } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<
      PaginatedUsersResponse,
      { page: number; limit: number }
    >({
      query: () => '/user',
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
