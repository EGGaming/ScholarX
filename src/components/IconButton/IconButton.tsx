import Icon from '@components/Icon/Icon';
import { useAppTheme } from '@theme/core';
import { IconButtonBase, IconButtonBaseContainer, IconButtonContainer } from '@components/IconButton/IconButton.base';
import { IconButtonProps } from '@components/IconButton/IconButton.types';
import React from 'react';
import {
  ButtonProps,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import styled, { css } from 'styled-components/native';

const IconButton: React.FC<
  IconButtonProps & {
    icon: React.ReactElement<React.ComponentProps<typeof Icon>>;
    onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  } & Omit<ButtonProps, 'title' | 'onPress'>
> = (props) => {
  const {
    icon,
    size = 'medium',
    variant = 'text',
    color = 'primary',
    hexColor = '',
    onPress = () => void 0,
    ...otherProps
  } = props;
  const theme = useAppTheme();

  const iconPropsColor: Partial<React.ComponentProps<typeof Icon>> = React.useMemo(() => {
    switch (variant) {
      case 'contained':
        return {
          color: 'inherit',
          hexColor: theme.palette.getContrastText(theme.palette.toColorValue(color)),
        };
      case 'outlined':
      case 'text':
        return {
          color,
        };
    }
  }, [variant, theme]);

  return (
    <IconButtonBaseContainer>
      <IconButtonBase size={size} variant={variant} color={color} hexColor={hexColor} onPress={onPress} {...otherProps}>
        <IconButtonContainer size={size} variant={variant} color={color} hexColor={hexColor}>
          {React.cloneElement(icon, {
            size,
            ...iconPropsColor,
          })}
        </IconButtonContainer>
      </IconButtonBase>
    </IconButtonBaseContainer>
  );
};

export default IconButton;
