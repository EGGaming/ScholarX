import { ButtonProps as DefaultButtonProps } from 'react-native';
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
} from '@components/Button/Button.base';

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
          <BaseContainer>
            <ButtonBase ref={ref as any} hexColor={hexColor} color={color} disabled={disabled} {...otherProps}>
              <ButtonBaseContainer
                size={size}
                disabled={disabled}
                variant={variant}
                color={color}
                hexColor={hexColor}
                textCentered={textCentered}>
                <ButtonIconContainer placement={iconPlacement}>
                  {React.isValidElement(icon) && React.cloneElement(icon, iconProps)}
                </ButtonIconContainer>
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
          </BaseContainer>
        );
      case 'right':
        return (
          <BaseContainer>
            <ButtonBase ref={ref as any} color={color} hexColor={hexColor} disabled={disabled} {...otherProps}>
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
                <ButtonIconContainer placement={iconPlacement}>
                  {React.isValidElement(icon) && React.cloneElement(icon, iconProps)}
                </ButtonIconContainer>
              </ButtonBaseContainer>
            </ButtonBase>
          </BaseContainer>
        );
    }
  return (
    <BaseContainer>
      <ButtonBase ref={ref as any} color={color} hexColor={hexColor} disabled={disabled} {...otherProps}>
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
    </BaseContainer>
  );
});

export default Button;
