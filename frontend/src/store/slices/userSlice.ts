import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
}

const initialState: UserState = {
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    clearUserId(state) {
      state.id = '';
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;

export default userSlice.reducer;
