import {
  addUser,
  removeUser,
  setTotalPages,
  setTotalUsers,
} from '@/store/slices/paginationSlice';
import { RootState } from '@/store/store';
import { PaginatedUsersResponse, User } from '@/types/user';
import { USERS_PER_PAGE } from '@/utils/constants';
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTotalPages(data.totalPages));
          dispatch(setTotalUsers(data.total));
        } catch (error) {
          console.error('Error updating pagination data:', error);
        }
      },
    }),
    getOneUser: builder.query<User, string>({
      query: (userId) => `/user/${userId}`,
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
        const { dispatch, queryFulfilled, getState } = api;
        try {
          await queryFulfilled;
          dispatch(userApi.util.invalidateTags(['User']));
          dispatch(removeUser());

          // maybe it's a strang solution but I didn't find another
          const updatedPage = (getState() as RootState).pagination.currentPage;
          window.history.replaceState(
            null,
            '',
            `?page=${updatedPage}&limit=${USERS_PER_PAGE}`
          );
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
  useGetOneUserQuery,
} = userApi;
