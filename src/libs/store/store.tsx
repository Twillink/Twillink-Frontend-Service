import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import toastReducer from './features/toastSlice';
import generalSubmitReducer from './features/generalSubmitSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      toast: toastReducer,
      generalSubmit: generalSubmitReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
