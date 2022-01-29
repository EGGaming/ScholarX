import React from 'react';
import { ActivityIndicatorProps } from 'react-native';

export interface LoaderProps extends ActivityIndicatorProps {
  size?: 'small' | 'medium' | 'large';
}
