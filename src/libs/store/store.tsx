import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import generalSubmitReducer from './features/generalSubmit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      generalSubmit: generalSubmitReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
