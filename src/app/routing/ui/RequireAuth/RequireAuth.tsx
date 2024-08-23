import React, { ReactNode, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectToken } from 'src/features/Auth';
import { getRouteMain } from 'src/shared/consts/router';
import { useAppSelector } from 'src/shared/lib/hooks';

interface RequireAuthProps {
  redirectTo?: string;
  children: ReactNode;
}

export const RequireAuth = ({ redirectTo = getRouteMain(), children }: RequireAuthProps) => {
  const isAuth = useAppSelector(selectToken);
  const location = useLocation();

  const navigateTo = useMemo(() => {
    if (!isAuth) return redirectTo;
  }, [isAuth, redirectTo]);

  if (navigateTo) return <Navigate to={navigateTo} replace state={{ from: location }} />;
  return children;
};
