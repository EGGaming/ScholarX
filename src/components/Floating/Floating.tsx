import { FloatingBase } from '@components/Floating/Floating.base';
import { FloatingProps } from '@components/Floating/Floating.types';
import { Portal } from '@gorhom/portal';
import { StyleSheet } from 'react-native';
import React from 'react';
import { FullWindowOverlay } from 'react-native-screens';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const Floating: React.FC<FloatingProps> = ({ children, verticalPlacement, horizontalPlacement, visible = false }) => {
  const yOffset = useSharedValue(150);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: yOffset.value }],
  }));
  React.useEffect(() => {
    if (visible) {
      yOffset.value = withSpring(0, { damping: 20 });
    } else {
      yOffset.value = withTiming(150, { duration: 300 });
    }
  }, [visible]);

  return (
    <Portal hostName='Root'>
      <FloatingBase
        style={style}
        verticalPlacement={verticalPlacement}
        horizontalPlacement={horizontalPlacement}
        visible={visible}>
        {children}
      </FloatingBase>
    </Portal>
  );
};

export default Floating;
