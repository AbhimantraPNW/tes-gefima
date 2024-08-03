'use client';
import useKeepLogin from '@/hooks/api/auth/useKeepLogin';
import { PropsWithChildren, useEffect } from 'react';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { keepLogin } = useKeepLogin();

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
