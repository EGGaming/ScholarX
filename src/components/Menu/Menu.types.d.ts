import { ButtonAccessoryProps, ButtonProps } from '@components/Button/Button.types';
import { IconButtonProps } from '@components/IconButton/IconButton.types';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import Icon from '@components/Icon/Icon';

export type MenuButtonType = 'text' | 'icon';

export type MenuProps = (
  | {
      type: 'icon';
      iconButtonProps?: IconButtonProps;
      icon: React.ReactElement<React.ComponentProps<typeof Icon>>;
    }
  | {
      type?: 'text';
      title: string;
      buttonProps?: ButtonProps & ButtonAccessoryProps;
    }
) & {
  items: MenuItemProps[];
  disabled?: boolean;
};
