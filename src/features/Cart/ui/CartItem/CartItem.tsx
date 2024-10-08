import React, { memo } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RemoveProductFromCart } from 'src/features/Cart';
import { getRouteProduct } from 'src/shared/consts/router';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import s from './CartItem.module.scss';

export interface CartItemProps {
  id: string;
  title: string;
  desc?: string;
  count: number;
  price: number;
  pic?: string;
  className?: string;
}

export const CartItem = memo(({ id, title, desc, count, price, pic, className }: CartItemProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(s.outer, className)}>
      <Link className={s.about} to={getRouteProduct(id)}>
        <PicWrapper className={s.pic} pic={pic} />
        <div className={s.info}>
          <p className={s.title}>{title}</p>
          {desc && <p className={s.desc}>{desc}</p>}
        </div>
      </Link>
      <div className={s.count}>{count}</div>
      <div className={s.price}>
        {price * count} {t('Руб')}.
      </div>
      <RemoveProductFromCart id={id} removeAll />
    </div>
  );
});

CartItem.displayName = 'CartItem';
