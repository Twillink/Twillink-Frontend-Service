import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IUploadProgressState {
  progress: number;
}

const initialState: IUploadProgressState = {
  progress: 0,
};

const uploadProgressSlice = createSlice({
  name: 'uploadProgress',
  initialState,
  reducers: {
    setUploadProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    resetUploadProgress(state) {
      state.progress = 0;
    },
  },
});

export const {setUploadProgress, resetUploadProgress} =
  uploadProgressSlice.actions;
export default uploadProgressSlice.reducer;
