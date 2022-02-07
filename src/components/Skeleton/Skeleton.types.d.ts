import { TypographyProps } from '@components/Typography/Typography.types';
import { TypographyComponent } from '@theme/core.types';
import { FlexStyle } from 'react-native';

export interface SkeletonProps {
  width: number | string;
}

export interface SkeletonTypographyProps extends SkeletonProps {
  variant?: TypographyComponent;
  align?: FlexStyle['alignSelf'];
}

export type SkeletonCircleProps =
  | {
      preset: 'icon';
      size?: 'small' | 'medium' | 'large' | 'card';
    }
  | SkeletonProps;

export type SkeletonBoxProps = {
  rounded?: boolean;
} & (
  | {
      preset: 'button';
      size?: 'small' | 'medium';
    }
  | SkeletonProps
);
