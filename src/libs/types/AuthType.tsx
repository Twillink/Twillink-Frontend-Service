export type AuthInitialData = {
  username: string;
  email: string;
  password: string;
  otp: string;
};

export type AuthSubmitState = {
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
};
