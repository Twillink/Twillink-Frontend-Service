import {IGeneralSubmit} from '@/libs/types/IGeneralSubmit';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: IGeneralSubmit = {
  isLoading: false,
  isSuccess: false,
  message: '',
};

const generalSubmitSlice = createSlice({
  name: 'generalSubmit',
  initialState,
  reducers: {
    setSubmitLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSubmitSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    setSubmitMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setGeneralSubmitState(
      state,
      action: PayloadAction<Partial<IGeneralSubmit>>,
    ) {
      const {isLoading, isSuccess, message} = action.payload;
      if (isLoading !== undefined) {
        state.isLoading = isLoading;
      }
      if (isSuccess !== undefined) {
        state.isSuccess = isSuccess;
      }
      if (message !== undefined) {
        state.message = message;
      }
    },
    resetSubmitState() {
      return initialState;
    },
  },
});

export const {
  setSubmitLoading,
  setSubmitSuccess,
  setSubmitMessage,
  setGeneralSubmitState,
  resetSubmitState,
} = generalSubmitSlice.actions;

export default generalSubmitSlice.reducer;
