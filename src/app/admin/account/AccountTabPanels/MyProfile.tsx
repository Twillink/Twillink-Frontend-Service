import React from 'react';
import FormProfile from './MyProfileForm/FormProfile';
import FormChangePassword from './MyProfileForm/FormChangePassword';
import {
  apiChangePassword,
  apiGetUserProfile,
  apiUpdateUserProfile,
  IChangePasswordBody,
  IUpdateUserProfileBody,
} from '@/libs/api';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import {setSubmitLoading} from '@/libs/store/features/generalSubmitSlice';
import {setUserProfile} from '@/libs/store/features/userProfileSlice';

const MyProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  const fetchUserProfile = () => {
    apiGetUserProfile(dispatch, false)
      .then(response => {
        dispatch(setUserProfile(response.data));
      })
      .catch();
  };

  const handleProfileSubmit = (values: {name: string; phoneNumber: string}) => {
    dispatch(setSubmitLoading(true));
    const body = {
      fullName: values.name,
      phoneNumber: values.phoneNumber,
    };

    apiUpdateUserProfile(dispatch, body as IUpdateUserProfileBody)
      .then(() => {
        fetchUserProfile();
      })
      .catch()
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
  };

  const handlePasswordSubmit = (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    dispatch(setSubmitLoading(true));
    const {currentPassword, newPassword} = values;
    const body: IChangePasswordBody = {currentPassword, newPassword};
    apiChangePassword(dispatch, body)
      .then()
      .catch(() => {
        fetchUserProfile();
      })
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
  };

  return (
    <div className="w-full">
      <FormProfile onSubmit={handleProfileSubmit} />
      <FormChangePassword onSubmit={handlePasswordSubmit} />
    </div>
  );
};

export default MyProfile;
