import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { getRouteMain } from 'src/shared/consts/router';
import logo from 'src/shared/assets/img/logo-pizza.svg?url';
import s from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
  return (
    <Link className={cn(s.outer, className)} to={getRouteMain()}>
      <img src={logo} alt={''} />
      <span className={s.subtitle}>PIZZA SHOP</span>
    </Link>
  );
});

AppLogo.displayName = 'AppLogo';
