'use client';

import {useEffect} from 'react';
import {useAppDispatch} from '@/libs/hooks/useReduxHook';
import {checkAuth} from '@/utils/checkAuth';
import {authLogin} from '@/libs/store/features/authSlice';

export default function ClientAuthLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {isLoggedIn, user} = checkAuth();
    if (isLoggedIn && user) {
      dispatch(authLogin(user));
    }
  }, [dispatch]);

  return <>{children}</>;
}
