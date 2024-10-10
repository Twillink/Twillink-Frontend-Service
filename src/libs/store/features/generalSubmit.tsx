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
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    resetSubmitState(state) {
      return initialState;
    },
  },
});

export const {setLoading, setSuccess, setMessage, resetSubmitState} =
  generalSubmitSlice.actions;

export default generalSubmitSlice.reducer;
