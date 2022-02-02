import { TypographyComponent } from '@theme/core.types';

export interface SkeletonProps {
  width: number | string;
}

export interface SkeletonTypographyProps extends SkeletonProps {
  variant?: TypographyComponent;
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
