import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MyWidgetState {
  data: IItemWidgetType[];
}

const initialState: MyWidgetState = {
  data: [],
};

const myWidgetSlice = createSlice({
  name: 'myWidget',
  initialState,
  reducers: {
    setWidgetData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
  },
});

export const {setWidgetData} = myWidgetSlice.actions;

export default myWidgetSlice.reducer;
