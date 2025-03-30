import { addUser, removeUser } from '@/store/slices/paginationSlice';
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
      onQueryStarted: async (_, api) => {
        const { dispatch, queryFulfilled } = api;
        try {
          await queryFulfilled;
          dispatch(userApi.util.invalidateTags(['User']));
          dispatch(addUser());
        } catch (error) {
          console.error('RTK Error during creatig user:', error);
        }
      },
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (_, api) => {
        const { dispatch, queryFulfilled } = api;
        try {
          await queryFulfilled;
          dispatch(userApi.util.invalidateTags(['User']));
          dispatch(removeUser());
        } catch (error) {
          console.error('RTK Error during removing user:', error);
        }
      },
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUsersQuery,
  useCreateUserMutation,
} = userApi;
