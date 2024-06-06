import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import { Roles } from '@/constants/enums';

interface AuthProps {
  children: React.ReactNode;
  role?: Roles;
}

export default function Auth({ children, role }: AuthProps) {
  const router = useRouter();
  const { user, isLoading, hasRole } = useUser();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(true);
    if (!isLoading && (((!user || !user.data) && role && router.pathname !== '/login') || (user && role && !hasRole(role)))) {
      router.push('/login');
      return;
    }

    if (user && user.data && ['/login', '/sign-up', '/verify-signup', '/reset-password'].includes(router.pathname)) {
      router.push('/');
      return;
    }
    setIsChecking(false);
  }, [router, user, isLoading]);

  return <>{(isLoading || isChecking) ? null : children}</>;
}
