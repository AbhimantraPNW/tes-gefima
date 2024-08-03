'use client';

import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const { role } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (role !== 'Admin') {
        redirect('/login');
      }
    }, [role]);  

    return <Component {...props} />;
  };
}
