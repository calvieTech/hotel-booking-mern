import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userCredentials: localStorage.getItem('userCredentials')
    ? JSON.parse(localStorage.getItem('userCredentials'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userCredentials = action.payload;
      localStorage.setItem('userCredentials', JSON.stringify(action.payload));
    },

    logout: (state, action) => {
      state.userCredentials = null;
      localStorage.removeItem('userCredentials');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
