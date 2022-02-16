import { ButtonProps } from '@components/Button/Button.types';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';

export interface MenuProps {
  items: MenuItemProps[];
  title: string;
  buttonProps?: ButtonProps;
}
