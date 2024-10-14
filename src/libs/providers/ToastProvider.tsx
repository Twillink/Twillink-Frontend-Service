'use client';
import React from 'react';
import Toast from '@/components/Toast';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHook';
import {RootState} from '../store/store';
import {hideToast} from '../store/features/toastSlice';

interface IToastProvider {
  children: React.ReactNode;
}

const ToastProvider: React.FC<IToastProvider> = ({children}) => {
  const dispatch = useAppDispatch();
  const {isVisible, title, message, type} = useAppSelector(
    (state: RootState) => state.toast,
  );

  return (
    <>
      {children}
      <Toast
        title={title}
        message={
          typeof message === 'string' ? message : JSON.stringify(message)
        }
        type={type}
        isVisible={isVisible}
        onClose={() => dispatch(hideToast())}
      />
    </>
  );
};

export default ToastProvider;
