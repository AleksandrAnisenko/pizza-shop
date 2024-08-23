import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import { Product } from 'src/entities/Product';
import { ProductListItem } from '../ProductListItem';
import s from './ProductsList.module.scss';
import { useTranslation } from 'react-i18next';

interface ProductsListProps {
  products: Product[] | null;
  isLoading?: boolean;
  className?: string;
  renderCartButton: (id: string) => ReactElement;
}

export const ProductsList = memo(
  ({ products, isLoading = false, className, renderCartButton }: ProductsListProps) => {
    const { t } = useTranslation();
    if (!products?.length && !isLoading) return t('Товары не найдены');

    return (
      <div className={cn(s.outer, className)}>
        {products?.map((product) => (
          <ProductListItem product={product} renderCartButton={renderCartButton} key={product.id} />
        ))}
      </div>
    );
  }
);

ProductsList.displayName = 'ProductList';
