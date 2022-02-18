import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import { CheckboxBase, CheckboxContainer, CheckboxFillContainer } from '@components/Checkbox/Checkbox.base';
import { CheckboxProps } from '@components/Checkbox/Checkbox.types';
import Icon from '@components/Icon/Icon';
import { useAppTheme } from '@theme/core';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, concat } from 'react-native-reanimated';

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange = () => void 0, hexColor = '', color = 'primary' }) => {
  const theme = useAppTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const checkStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
  React.useEffect(() => {
    if (checked) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1);
    } else {
      opacity.value = withSpring(0);
      scale.value = withSpring(0);
    }
  }, [checked]);
  function handleOnPress() {
    onChange(!checked);
  }

  return (
    <CheckboxBase>
      <NativeButtonBase onPress={handleOnPress}>
        <CheckboxContainer>
          <CheckboxFillContainer style={style} color={color} hexColor={hexColor}>
            <Animated.View style={checkStyle}>
              <Icon
                bundle='Feather'
                name='check'
                color='inherit'
                hexColor={theme.palette.getContrastText(theme.palette.toColorValue(color))}
              />
            </Animated.View>
          </CheckboxFillContainer>
        </CheckboxContainer>
      </NativeButtonBase>
    </CheckboxBase>
  );
};

export default Checkbox;
