import Icon from '@components/Icon/Icon';
import { AppColors } from '@theme/core.types';
import React from 'react';

export interface FloatingButtonProps {
  icon: React.ReactElement<React.ComponentProps<typeof Icon>>;
  onPress?: () => void;
  color?: AppColors;
  hexColor?: string;
}
