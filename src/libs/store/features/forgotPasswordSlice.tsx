import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IForgotPasswordState {
  email: string;
  codeOtp: string;
}

const initialValue: IForgotPasswordState = {
  email: '',
  codeOtp: '',
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: initialValue,
  reducers: {
    setForgotPassword(state, action: PayloadAction<IForgotPasswordState>) {
      state.email = action.payload.email;
      state.codeOtp = action.payload.codeOtp;
    },
    resetForgotPasswordState() {
      return initialValue;
    },
  },
});

export const {setForgotPassword, resetForgotPasswordState} =
  forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
