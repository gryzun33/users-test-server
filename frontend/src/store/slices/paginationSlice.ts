import { USERS_PER_PAGE } from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface PaginationState {
  currentPage: number;
  totalUsers: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalUsers: 0,
  totalPages: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalUsers: (state, action: PayloadAction<number>) => {
      state.totalUsers = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    addUser: (state) => {
      const newTotalUsers = state.totalUsers + 1;
      state.totalUsers = newTotalUsers;

      const newTotalPages = Math.ceil(newTotalUsers / USERS_PER_PAGE);
      state.totalPages = newTotalPages;

      state.currentPage = newTotalPages;
    },
    removeUser: (state) => {
      const newTotalUsers = state.totalUsers - 1;
      state.totalUsers = newTotalUsers;

      const newTotalPages = Math.ceil(newTotalUsers / USERS_PER_PAGE);
      state.totalPages = newTotalPages;

      if (state.currentPage > newTotalPages) {
        state.currentPage = newTotalPages > 0 ? newTotalPages : 1;
      }
    },
  },
});

const persistConfig = {
  key: 'pagination',
  storage,
  whitelist: ['currentPage'],
};

const persistedPaginationReducer = persistReducer(
  persistConfig,
  paginationSlice.reducer
);

export const { setPage, setTotalUsers, setTotalPages, addUser, removeUser } =
  paginationSlice.actions;
export default persistedPaginationReducer;
