import { getRouteCart, getRouteCatalog, getRouteCategories } from 'src/shared/consts/router';
import BugIcon from 'src/shared/assets/icons/Bag.svg';

interface MenuListItem {
  id: string;
  name: string;
  icon?: SVGType;
  link: string;
  end?: boolean;
}

export const MENU_LIST: MenuListItem[] = [
  {
    id: '1',
    name: 'Каталог',
    link: getRouteCatalog(),
  },
  {
    id: '2',
    name: 'Категории',
    link: getRouteCategories(),
  },
  {
    id: '4',
    name: 'Корзина',
    icon: BugIcon,
    link: getRouteCart(),
  },
] as const;
