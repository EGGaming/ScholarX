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
          <ButtonBase hexColor={hexColor} ref={ref as any} color={color} variant={variant} {...otherProps}>
            <ButtonBaseContainer variant={variant} color={color} hexColor={hexColor}>
              <ButtonIconContainer placement={iconPlacement}>{React.cloneElement(icon, iconProps)}</ButtonIconContainer>
              <ButtonText variant={variant} color={color} hexColor={hexColor}>
                {title}
              </ButtonText>
            </ButtonBaseContainer>
          </ButtonBase>
        );
      case 'right':
        return (
          <ButtonBase ref={ref as any} color={color} variant={variant} {...otherProps} hexColor={hexColor}>
            <ButtonBaseContainer variant={variant} color={color} hexColor={hexColor}>
              <ButtonText variant={variant} color={color} hexColor={hexColor}>
                {title}
              </ButtonText>
              <ButtonIconContainer placement={iconPlacement}>{React.cloneElement(icon, iconProps)}</ButtonIconContainer>
            </ButtonBaseContainer>
          </ButtonBase>
        );
    }
  return (
    <ButtonBase ref={ref as any} color={color} variant={variant} hexColor={hexColor} {...otherProps}>
      <ButtonBaseContainer variant={variant} color={color} hexColor={hexColor}>
        <ButtonText variant={variant} color={color} hexColor={hexColor}>
          {title}
        </ButtonText>
      </ButtonBaseContainer>
    </ButtonBase>
  );
});

export default Button;
