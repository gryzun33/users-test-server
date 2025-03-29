import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface PaginationState {
  currentPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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

export const { setPage } = paginationSlice.actions;
export default persistedPaginationReducer;
