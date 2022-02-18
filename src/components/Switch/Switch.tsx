import {
  SwitchBaseCircle,
  SwitchBaseContainer,
  SwitchBaseEnd,
  SwitchBaseStart,
  SwitchBaseTouchable,
} from '@components/Switch/Switch.base';
import { SwitchProps } from '@components/Switch/Switch.types';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { Animated, View } from 'react-native';

const Switch: React.FC<SwitchProps> = (props) => {
  const theme = useAppTheme();
  const {
    checked = false,
    onChange = () => void 0,
    disabled = false,
    color = theme.mode === 'dark' ? 'secondary' : 'primary',
    hexColor = '',
  } = props;
  const slideAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (checked) Animated.spring(slideAnimation, { useNativeDriver: true, toValue: 36 }).start();
    else Animated.spring(slideAnimation, { useNativeDriver: true, toValue: 0 }).start();
  }, [checked]);

  function handleOnPress() {
    onChange(!checked);
  }

  return (
    <SwitchBaseTouchable onPress={handleOnPress}>
      <View>
        <SwitchBaseCircle
          checked={checked}
          disabled={disabled}
          color={color}
          hexColor={hexColor}
          style={{ transform: [{ translateX: slideAnimation }] }}
        />
        <SwitchBaseContainer checked={checked} disabled={disabled} color={color} hexColor={hexColor}>
          <SwitchBaseStart checked={checked} disabled={disabled} color={color} hexColor={hexColor} />
          <SwitchBaseEnd checked={checked} disabled={disabled} color={color} hexColor={hexColor} />
        </SwitchBaseContainer>
      </View>
    </SwitchBaseTouchable>
  );
};

export default Switch;
