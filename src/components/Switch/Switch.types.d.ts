import { AppColors } from '@theme/core.types';
import { TouchableNativeFeedbackProps } from 'react-native';

export interface SwitchProps {
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  color?: AppColors;
  hexColor?: string;
}

export interface SwitchBaseProps {
  disabled: boolean;
  checked: boolean;
  color: AppColors;
  hexColor: string;
}
