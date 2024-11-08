import {hideToast, showToast} from '@/libs/store/features/toastSlice';

export const handleShowToast = (
  toast: any,
  dispatch: (action: any) => void,
  autoHide = true,
) => {
  dispatch(showToast(toast));
  if (!autoHide) return;
  setTimeout(() => {
    dispatch(hideToast());
  }, 3000);
};
