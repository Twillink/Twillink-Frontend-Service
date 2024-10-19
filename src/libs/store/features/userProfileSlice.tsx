import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Link {
  id: number;
  userName: string;
  createdAt: string;
  updatedAt: string | null;
}

interface LinkUserAuth {
  id: number;
  grantRole: string;
  linkId: number;
  userId: number;
  link: Link;
}

interface Profile {
  id: number;
  fullName: string;
  phoneNumber: string | null;
  description: string | null;
  biography: string | null;
  languagePreference: string;
  createdAt: string;
  updatedAt: string | null;
  userId: number;
  attachmentId: number | null;
  profileInterest: Array<any>;
}

interface UserProfile {
  id: number;
  email: string;
  role: string;
  profile: Profile;
  linkUserAuth: LinkUserAuth[];
  askMe: Array<any>;
}

interface UserProfileState {
  profile: UserProfile | null;
}

const initialState: UserProfileState = {
  profile: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
    },
    clearUserProfile(state) {
      state.profile = null;
    },
  },
});

export const {setUserProfile, clearUserProfile} = userProfileSlice.actions;

export default userProfileSlice.reducer;
