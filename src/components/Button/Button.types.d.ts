import { AppColors, ButtonVariants, TypographyColors } from '@theme/core.types';
import Icon from '@components/Icon/Icon';

export interface ButtonProps {
  variant?: ButtonVariants;
  color?: AppColors;
  hexColor?: string;
}
export interface ButtonAccessoryProps {
  icon?: React.ReactElement<React.ComponentProps<typeof Icon>>;
  iconPlacement?: 'left' | 'right';
}
