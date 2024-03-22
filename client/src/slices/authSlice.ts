import { createSlice } from '@reduxjs/toolkit';

const storedUserCredentials = localStorage.getItem('userCredentials');
const userCredentials = storedUserCredentials
  ? JSON.parse(storedUserCredentials)
  : null;

const initialState = {
  userCredentials: userCredentials,
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
