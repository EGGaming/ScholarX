import { ButtonProps as DefaultButtonProps, Text, View } from 'react-native';
import React from 'react';

import { useAppTheme } from '@theme/core';
import { IconPack, IconProps } from '@components/Icon/Icon.types';
import { ButtonAccessoryProps, ButtonProps } from '@components/Button/Button.types';
import {
  BaseContainer,
  ButtonBase,
  ButtonBaseContainer,
  ButtonIconContainer,
  ButtonText,
  ButtonTextContainer,
  NativeButtonBase,
} from '@components/Button/Button.base';
import Typography from '@components/Typography/Typography';
import Space from '@components/Space/Space';

const Button: React.FC<ButtonProps & Omit<DefaultButtonProps, 'onPress'> & ButtonAccessoryProps> = React.forwardRef(
  (props, ref) => {
    const {
      variant = 'text',
      color = 'primary',
      title,
      icon,
      iconPlacement = 'left',
      hexColor = '',
      textCentered = false,
      disabled = false,
      size = 'medium',
      native = false,
      onPress = () => void 0,
      ...otherProps
    } = props;

    const theme = useAppTheme();

    const iconProps: (Partial<IconProps<IconPack>> & React.Attributes) | undefined = React.useMemo(() => {
      if (disabled)
        return {
          color: 'inherit',
          hexColor: theme.palette.toRGBA(theme.palette.toColorValue(color), 0.5),
        };
      if (color === 'inherit')
        return {
          color: 'inherit',
          hexColor,
        };
      switch (variant) {
        default:
        case 'text':
        case 'outlined':
          return {
            color,
          };
        case 'contained':
          return {
            color: 'inherit',
            hexColor: theme.palette.getContrastText(theme.palette.toColorValue(color)),
          };
      }
    }, [color, hexColor, theme, variant]);

    if (icon)
      switch (iconPlacement) {
        case 'left':
        default:
          return (
            <BaseContainer>
              {native ? (
                <NativeButtonBase
                  ref={ref as any}
                  hexColor={hexColor}
                  color={color}
                  disabled={disabled}
                  onPress={onPress}
                  {...otherProps}>
                  <ButtonBaseContainer
                    native={native}
                    size={size}
                    disabled={disabled}
                    variant={variant}
                    color={color}
                    hexColor={hexColor}
                    onPress={onPress}
                    textCentered={textCentered}>
                    <ButtonIconContainer placement={iconPlacement}>
                      {React.isValidElement(icon) && React.cloneElement(icon, iconProps)}
                    </ButtonIconContainer>
                    <ButtonText
                      size={size}
                      disabled={disabled}
                      variant={variant}
                      onPress={onPress}
                      color={color}
                      hexColor={hexColor}
                      textCentered={textCentered}
                      native={native}>
                      {title}
                    </ButtonText>
                  </ButtonBaseContainer>
                </NativeButtonBase>
              ) : (
                <ButtonBase
                  ref={ref as any}
                  hexColor={hexColor}
                  color={color}
                  disabled={disabled}
                  onPress={onPress}
                  {...otherProps}>
                  <ButtonBaseContainer
                    native={native}
                    size={size}
                    disabled={disabled}
                    variant={variant}
                    color={color}
                    hexColor={hexColor}
                    onPress={onPress}
                    textCentered={textCentered}>
                    <ButtonIconContainer placement={iconPlacement}>
                      {React.isValidElement(icon) && React.cloneElement(icon, iconProps)}
                    </ButtonIconContainer>
                    <ButtonText
                      size={size}
                      disabled={disabled}
                      variant={variant}
                      onPress={onPress}
                      color={color}
                      hexColor={hexColor}
                      textCentered={textCentered}
                      native={native}>
                      {title}
                    </ButtonText>
                  </ButtonBaseContainer>
                </ButtonBase>
              )}
            </BaseContainer>
          );
        case 'right':
          return (
            <BaseContainer>
              {native ? (
                <NativeButtonBase
                  ref={ref as any}
                  color={color}
                  hexColor={hexColor}
                  disabled={disabled}
                  onPress={onPress}
                  {...otherProps}>
                  <ButtonBaseContainer
                    size={size}
                    disabled={disabled}
                    variant={variant}
                    onPress={onPress}
                    color={color}
                    hexColor={hexColor}
                    textCentered={textCentered}
                    native={native}>
                    <ButtonText
                      size={size}
                      disabled={disabled}
                      variant={variant}
                      onPress={onPress}
                      color={color}
                      hexColor={hexColor}
                      textCentered={textCentered}
                      native={native}>
                      {title}
                    </ButtonText>
                    <ButtonIconContainer placement={iconPlacement}>
                      {React.isValidElement(icon) && React.cloneElement(icon, iconProps)}
                    </ButtonIconContainer>
                  </ButtonBaseContainer>
                </NativeButtonBase>
              ) : (
                <ButtonBase
                  ref={ref as any}
                  color={color}
                  hexColor={hexColor}
                  disabled={disabled}
                  onPress={onPress}
                  {...otherProps}>
                  <ButtonBaseContainer
                    size={size}
                    disabled={disabled}
                    variant={variant}
                    onPress={onPress}
                    color={color}
                    hexColor={hexColor}
                    textCentered={textCentered}
                    native={native}>
                    <ButtonText
                      size={size}
                      disabled={disabled}
                      variant={variant}
                      onPress={onPress}
                      color={color}
                      hexColor={hexColor}
                      textCentered={textCentered}
                      native={native}>
                      {title}
                    </ButtonText>
                    <ButtonIconContainer placement={iconPlacement}>
                      {React.isValidElement(icon) && React.cloneElement(icon, iconProps)}
                    </ButtonIconContainer>
                  </ButtonBaseContainer>
                </ButtonBase>
              )}
            </BaseContainer>
          );
      }
    return (
      <BaseContainer>
        {native ? (
          <NativeButtonBase
            ref={ref as any}
            color={color}
            hexColor={hexColor}
            disabled={disabled}
            onPress={onPress}
            {...otherProps}>
            <ButtonBaseContainer
              size={size}
              disabled={disabled}
              variant={variant}
              onPress={onPress}
              color={color}
              hexColor={hexColor}
              textCentered={textCentered}
              native={native}>
              <ButtonText
                size={size}
                disabled={disabled}
                variant={variant}
                onPress={onPress}
                color={color}
                hexColor={hexColor}
                textCentered={textCentered}
                native={native}>
                {title}
              </ButtonText>
            </ButtonBaseContainer>
          </NativeButtonBase>
        ) : (
          <ButtonBase
            ref={ref as any}
            color={color}
            hexColor={hexColor}
            disabled={disabled}
            onPress={onPress}
            {...otherProps}>
            <ButtonBaseContainer
              size={size}
              disabled={disabled}
              variant={variant}
              onPress={onPress}
              color={color}
              hexColor={hexColor}
              textCentered={textCentered}
              native={native}>
              <ButtonText
                size={size}
                disabled={disabled}
                variant={variant}
                onPress={onPress}
                color={color}
                hexColor={hexColor}
                textCentered={textCentered}
                native={native}>
                {title}
              </ButtonText>
            </ButtonBaseContainer>
          </ButtonBase>
        )}
      </BaseContainer>
    );
  }
);

export default Button;
