import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCategoryByIdQuery } from 'src/entities/Category/api/categoriesApi';
import { getRouteCategories } from 'src/shared/consts/router';
import { Button } from 'src/shared/ui/Button';
import { ConfirmModal } from 'src/shared/ui/modals/ConfirmModal';
import CloseIcon from 'src/shared/assets/icons/Trash.svg';
import { useDeleteCategoryMutation } from '../../api/categoryMutationApi';
import { useTranslation } from 'react-i18next';

interface DeleteCategoryProps {
  id: string;
  className?: string;
}

export const DeleteCategory = memo(({ id, className }: DeleteCategoryProps) => {
  const [deleteCategory, { data, isLoading }] = useDeleteCategoryMutation();
  const { data: category, isLoading: categoryLoading } = useFetchCategoryByIdQuery(id || '', {
    skip: !id || !!data,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRemove = useCallback(async () => {
    await deleteCategory(id);
    navigate(getRouteCategories());
  }, [deleteCategory, id, navigate]);

  const button = useCallback(
    (open: () => void) => (
      <Button
        label={t('Удалить')}
        iconPosition="right"
        icon={CloseIcon}
        variant="secondary"
        size="xs"
        onClick={open}
      />
    ),
    []
  );

  if (categoryLoading || isLoading || data || !category) return null;

  return (
    <div className={className}>
      <ConfirmModal
        button={button}
        title={`${t('Удалить Категорию')} ${category.name}?`}
        desc={t('После удаления восстановить категорию будет невозможно')}
        onConfirm={handleRemove}
        disabled={isLoading || categoryLoading}
        confirmText={t('Удалить')}
      />
    </div>
  );
});

DeleteCategory.displayName = 'DeleteCategory';
