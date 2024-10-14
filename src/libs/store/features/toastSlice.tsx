import {ToastType} from '@/libs/types/ToastType';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IToastState {
  isVisible: boolean;
  title: string;
  message: string | object;
  type: ToastType;
}

const initialState: IToastState = {
  isVisible: false,
  title: '',
  message: '',
  type: ToastType.INFO,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<Omit<IToastState, 'isVisible'>>) {
      return {...action.payload, isVisible: true};
    },
    hideToast(state) {
      state.isVisible = false;
    },
    resetToastState() {
      return initialState;
    },
  },
});

export const {showToast, hideToast, resetToastState} = toastSlice.actions;
export default toastSlice.reducer;
