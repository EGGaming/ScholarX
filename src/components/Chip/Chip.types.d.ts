import { AppColors } from '@theme/core.types';

export interface ChipProps {
  title: string;
  color?: AppColors;
  hexColor?: string;
  onPress?: () => void;
  onRemove?: () => void;
  variant?: 'outlined' | 'contained';
  disabled?: boolean;
  visible?: boolean; // Allows for animation on mount and unmount
}

export type ChipBaseProps = Required<Pick<ChipProps, 'color' | 'hexColor' | 'variant' | 'disabled'>>;
