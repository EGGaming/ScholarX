import { TypographyBase } from '@components/Typography/Typography.base';
import { TypographyProps } from '@components/Typography/Typography.types';
import React from 'react';
import { TextProps } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const Typography: React.FC<TypographyProps & TextProps> = React.forwardRef((props, ref) => {
  const {
    children,
    color = 'textPrimary',
    bold = false,
    italics = false,
    variant = 'body',
    hexColor = '',
    onPress,
    ...otherProps
  } = props;
  if (onPress)
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <TypographyBase
          ref={ref as any}
          color={color}
          bold={bold}
          italics={italics}
          variant={variant}
          hexColor={hexColor}
          {...otherProps}>
          {children}
        </TypographyBase>
      </TouchableWithoutFeedback>
    );
  return (
    <TypographyBase
      ref={ref as any}
      color={color}
      bold={bold}
      italics={italics}
      variant={variant}
      hexColor={hexColor}
      {...otherProps}>
      {children}
    </TypographyBase>
  );
});

export default Typography;
