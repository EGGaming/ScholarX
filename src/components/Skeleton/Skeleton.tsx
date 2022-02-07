import { SkeletonBoxBase, SkeletonCircleBase, SkeletonTypographyBase } from '@components/Skeleton/Skeleton.base';
import {
  SkeletonBoxProps,
  SkeletonCircleProps,
  SkeletonProps,
  SkeletonTypographyProps,
} from '@components/Skeleton/Skeleton.types';
import { useSkeletonSharedValue } from '@context/SkeletonSharedValueContext/SkeletonSharedValueContext';
import React from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

class Skeleton {
  public static Typography: React.FC<SkeletonTypographyProps> = ({ width, variant = 'body', align = 'flex-start' }) => {
    const opacity = useSkeletonSharedValue();

    const style = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      []
    );
    return <SkeletonTypographyBase width={width} style={style} variant={variant} align={align} />;
  };
  public static Circle: React.FC<SkeletonCircleProps> = (props) => {
    const opacity = useSkeletonSharedValue();

    const style = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      []
    );

    return <SkeletonCircleBase style={style} {...props} />;
  };
  public static Box: React.FC<SkeletonBoxProps> = (props) => {
    const opacity = useSkeletonSharedValue();

    const style = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      []
    );
    return <SkeletonBoxBase style={style} {...props} />;
  };
}

export default Skeleton;
