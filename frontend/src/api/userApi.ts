import { PaginatedUsersResponse, User } from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<
      PaginatedUsersResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/user?page=${page}&limit=${limit}`,
      providesTags: ['User'],
    }),
    createUser: builder.mutation<User, FormData>({
      query: (newUser) => ({
        url: '/user',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUsersQuery,
  useCreateUserMutation,
} = userApi;
