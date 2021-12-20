import { AppColors, ButtonVariants } from '@theme/core.types';

export interface IconButtonProps {
  size?: 'small' | 'medium' | 'large';
  variant?: ButtonVariants;
  color?: AppColors;
  hexColor?: string;
}
