import { AppColors } from '@theme/core.types';

export interface ChipProps {
  title: string;
  color?: AppColors;
  hexColor?: string;
  onPress?: () => void;
}

export type ChipBaseProps = Required<Pick<ChipProps, 'color' | 'hexColor'>>;
