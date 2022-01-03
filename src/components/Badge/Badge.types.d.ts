import React from 'react';
import { AppColors } from '@theme/core.types';

export interface BadgeProps {
  badgeCount: number;
  color?: AppColors;
  hexColor?: string;
}
