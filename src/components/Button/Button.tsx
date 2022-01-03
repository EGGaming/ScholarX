import { ButtonProps as DefaultButtonProps } from 'react-native';
import React from 'react';

import { useAppTheme } from '@theme/core';
import { IconPack, IconProps } from '@components/Icon/Icon.types';
import { ButtonAccessoryProps, ButtonProps } from '@components/Button/Button.types';
import { ButtonBase, ButtonBaseContainer, ButtonIconContainer, ButtonText } from '@components/Button/Button.base';

const Button: React.FC<ButtonProps & DefaultButtonProps & ButtonAccessoryProps> = React.forwardRef((props, ref) => {
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
    ...otherProps
  } = props;

  const theme = useAppTheme();

  const iconProps: (Partial<IconProps<IconPack>> & React.Attributes) | undefined = React.useMemo(() => {
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
          <ButtonBase
            size={size}
            disabled={disabled}
            hexColor={hexColor}
            ref={ref as any}
            color={color}
            variant={variant}
            textCentered={textCentered}
            {...otherProps}>
            <ButtonBaseContainer
              size={size}
              disabled={disabled}
              variant={variant}
              color={color}
              hexColor={hexColor}
              textCentered={textCentered}>
              <ButtonIconContainer placement={iconPlacement}>{React.cloneElement(icon, iconProps)}</ButtonIconContainer>
              <ButtonText
                size={size}
                disabled={disabled}
                variant={variant}
                color={color}
                hexColor={hexColor}
                textCentered={textCentered}>
                {title}
              </ButtonText>
            </ButtonBaseContainer>
          </ButtonBase>
        );
      case 'right':
        return (
          <ButtonBase
            size={size}
            disabled={disabled}
            ref={ref as any}
            color={color}
            variant={variant}
            {...otherProps}
            hexColor={hexColor}
            textCentered={textCentered}
            {...otherProps}>
            <ButtonBaseContainer
              size={size}
              disabled={disabled}
              variant={variant}
              color={color}
              hexColor={hexColor}
              textCentered={textCentered}>
              <ButtonText
                size={size}
                disabled={disabled}
                variant={variant}
                color={color}
                hexColor={hexColor}
                textCentered={textCentered}>
                {title}
              </ButtonText>
              <ButtonIconContainer placement={iconPlacement}>{React.cloneElement(icon, iconProps)}</ButtonIconContainer>
            </ButtonBaseContainer>
          </ButtonBase>
        );
    }
  return (
    <ButtonBase
      size={size}
      disabled={disabled}
      ref={ref as any}
      color={color}
      variant={variant}
      hexColor={hexColor}
      textCentered={textCentered}
      {...otherProps}>
      <ButtonBaseContainer
        size={size}
        disabled={disabled}
        variant={variant}
        color={color}
        hexColor={hexColor}
        textCentered={textCentered}>
        <ButtonText
          size={size}
          disabled={disabled}
          variant={variant}
          color={color}
          hexColor={hexColor}
          textCentered={textCentered}>
          {title}
        </ButtonText>
      </ButtonBaseContainer>
    </ButtonBase>
  );
});

export default Button;
