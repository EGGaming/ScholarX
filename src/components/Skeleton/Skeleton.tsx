import { SkeletonCircleBase, SkeletonTypographyBase } from '@components/Skeleton/Skeleton.base';
import { SkeletonCircleProps, SkeletonProps, SkeletonTypographyProps } from '@components/Skeleton/Skeleton.types';
import React from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

class Skeleton {
  public static Typography: React.FC<SkeletonTypographyProps> = ({ width, variant = 'body' }) => {
    const opacity = useSharedValue(0.2);
    opacity.value = withRepeat(withTiming(0.4, { duration: 1000, easing: Easing.exp }), -1, true);

    const style = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      []
    );
    return <SkeletonTypographyBase width={width} style={style} variant={variant} />;
  };
  public static Circle: React.FC<SkeletonCircleProps> = (props) => {
    const opacity = useSharedValue(0.2);
    opacity.value = withRepeat(withTiming(0.4, { duration: 1000, easing: Easing.exp }), -1, true);

    const style = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      []
    );

    return <SkeletonCircleBase style={style} {...props} />;
  };
}

export default Skeleton;
