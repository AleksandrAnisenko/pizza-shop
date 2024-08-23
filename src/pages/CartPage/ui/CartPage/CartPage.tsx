import React, { memo } from 'react';
import { CartList } from 'src/features/Cart';
import { Heading } from 'src/shared/ui/Heading';
import { CreateOrder } from 'src/widgets/Order';
import s from './CartPage.module.scss';
import { useTranslation } from 'react-i18next';

export const CartPage = memo(() => {
  const { t } = useTranslation();
  return (
    <div className={s.outer}>
      <Heading as="h1" size="h3">
        {t('Корзина')}
      </Heading>
      <CartList />
      <CreateOrder className={s.btn} />
    </div>
  );
});

CartPage.displayName = 'CartPage';
