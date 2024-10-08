import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    authLogout: state => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const {authLogin, authLogout} = authSlice.actions;
export default authSlice.reducer;
