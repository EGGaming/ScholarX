import { AppColors } from '@theme/core.types';

export interface CheckboxProps {
  checked: boolean;
  onChange?: (e: boolean) => void;
  color?: AppColors;
  hexColor?: string;
}
