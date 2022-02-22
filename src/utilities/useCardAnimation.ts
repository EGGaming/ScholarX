import useComponentMounted from '@utilities/useComponentMounted';
import React from 'react';
import { InteractionManager } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function useCardAnimation() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);

  React.useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withTiming(0, { duration: 300 });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return style;
}
