import { AppColors } from '@theme/core.types';

export interface ChipProps {
  title: string;
  color?: AppColors;
  hexColor?: string;
  onPress?: () => void;
  onRemove?: () => void;
}

export type ChipBaseProps = Pick<ChipProps, 'color' | 'hexColor'>;
