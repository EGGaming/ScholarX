import { AppColors, ButtonVariants, TypographyColors } from '@theme/core.types';
import { NativeTouchEvent, NativeSyntheticEvent } from 'react-native';
import Icon from '@components/Icon/Icon';

export interface ButtonProps {
  variant?: ButtonVariants;
  color?: AppColors;
  hexColor?: string;
  textCentered?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium';
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}
export interface ButtonAccessoryProps {
  icon?: React.ReactElement<React.ComponentProps<typeof Icon>> | boolean;
  iconPlacement?: 'left' | 'right';
}
