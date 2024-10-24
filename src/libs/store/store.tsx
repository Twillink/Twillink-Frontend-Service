import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userProfileReducer from './features/userProfileSlice';
import toastReducer from './features/toastSlice';
import generalSubmitReducer from './features/generalSubmitSlice';
import myWidgetReducer from './features/myWidgetSlice';
import countryReducer from './features/countrySlice';
import forgotPasswordReducer from './features/forgotPasswordSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      userProfile: userProfileReducer,
      toast: toastReducer,
      generalSubmit: generalSubmitReducer,
      myWidget: myWidgetReducer,
      country: countryReducer,
      forgotPassword: forgotPasswordReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
