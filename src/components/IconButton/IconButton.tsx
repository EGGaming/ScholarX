import Icon from '@components/Icon/Icon';
import { useAppTheme } from '@theme/core';
import { IconButtonBase, IconButtonBaseContainer } from '@components/IconButton/IconButton.base';
import { IconButtonProps } from '@components/IconButton/IconButton.types';
import React from 'react';
import { ButtonProps, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

const IconButton: React.FC<
  IconButtonProps & { icon: React.ReactElement<React.ComponentProps<typeof Icon>> } & Omit<ButtonProps, 'title'>
> = (props) => {
  const { icon, size = 'medium', variant = 'text', color = 'primary', hexColor = '', ...otherProps } = props;
  const theme = useAppTheme();

  const iconPropsComponent: Partial<React.ComponentProps<typeof Icon>> = React.useMemo(() => {
    switch (size) {
      case 'small':
        return {
          component: 'button',
        };
      case 'medium':
        return {
          component: 'body',
        };
      case 'large':
        return {
          component: 'h3',
        };
    }
  }, [size]);

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
    <IconButtonBase size={size} variant={variant} color={color} hexColor={hexColor} {...otherProps}>
      <IconButtonBaseContainer size={size} variant={variant} color={color} hexColor={hexColor}>
        {React.cloneElement(icon, {
          ...iconPropsComponent,
          ...iconPropsColor,
        })}
      </IconButtonBaseContainer>
    </IconButtonBase>
  );
};

export default IconButton;
