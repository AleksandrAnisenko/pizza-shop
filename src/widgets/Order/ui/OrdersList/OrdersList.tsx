import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { useFetchProfileQuery } from 'src/entities/Profile';
import { getRouteProduct } from 'src/shared/consts/router';
import { formatDate } from 'src/shared/lib/utils/formatDate';
import { Heading } from 'src/shared/ui/Heading';
import { PicWrapper } from 'src/shared/ui/PicWrapper';
import { Text } from 'src/shared/ui/Text';
import { OrderStatus } from 'src/widgets/Order/model/types/orderTypes';
import { useFetchOrdersQuery } from '../../api/orderApi';
import s from './OrdersList.module.scss';
import { useTranslation } from 'react-i18next';

interface OrdersListProps {
  className?: string;
}

export const OrdersList = memo(({ className }: OrdersListProps) => {
  const { t } = useTranslation();
  const {
    data: profile,
    isLoading: profileIsLoading,
    error: profileError,
  } = useFetchProfileQuery();
  const {
    data: orders,
    isLoading: ordersIsLoading,
    error: ordersError,
  } = useFetchOrdersQuery({ userId: profile?.id }, { skip: !profile?.id });

  const isLoading = profileIsLoading || ordersIsLoading;
  const error = ordersError || profileError;

  if (isLoading) return `${t('Загружаем')}...`;
  if (error || !orders) return <Text color="error">{(error as string) || t('Ошибка Загрузки')}</Text>;
  if (!orders.length) return t('Вы еще не совершали заказов');

  return (
    <div className={cn(s.outer, className)}>
      {orders.map(({ id, createdAt, status, products }) => (
        <div key={id}>
          <Heading className={s.title} as="h3" size="h6" weight="normal">
          {t('Заказ')} {id} {t('От')} {formatDate(createdAt)}
          </Heading>
          <div className={s.status}>{OrderStatus[status]}</div>
          <div className={s.products}>
            {products.map(({ product: { id, photo } }) => (
              <Link className={s.product} to={getRouteProduct(id)} key={id}>
                <PicWrapper className={s.pic} pic={photo} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

OrdersList.displayName = 'OrdersList';
