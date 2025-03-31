import { userApi } from '@/api/userApi';
import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './slices/paginationSlice';
import userReducer from './slices/userSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pagination: paginationReducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
