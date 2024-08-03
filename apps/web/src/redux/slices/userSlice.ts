import { User } from '@/types/user.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: User = {
  id: 0,
  fullName: '',
  email: '',
  role: '',
  createdAt: new Date()
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role
      state.createdAt = action.payload.createdAt;
    },

    logoutAction: (state) => {
      state.id = 0;
      state.fullName = '';
      state.email = '';
      state.role = ''
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
