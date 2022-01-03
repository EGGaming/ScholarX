import {
  TextFieldAdornmentEndContainer,
  TextFieldAdornmentStartContainer,
  TextFieldBase,
  TextFieldBaseContainer,
} from '@components/TextField/TextField.base';
import { TextFieldAccessoryProps, TextFieldProps } from '@components/TextField/TextField.types';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { TextInputProps } from 'react-native';

const TextField = React.forwardRef((props: TextFieldProps & TextInputProps & TextFieldAccessoryProps, ref) => {
  const { width = 150, adornmentEnd, adornmentStart, ...otherProps } = props;
  const theme = useAppTheme();
  return (
    <TextFieldBaseContainer width={width}>
      <TextFieldBase
        ref={ref as any}
        placeholderTextColor={theme.palette.text.disabled}
        adornmentEnd={adornmentEnd}
        adornmentStart={adornmentStart}
        {...otherProps}
      />
      {adornmentEnd && (
        <TextFieldAdornmentEndContainer>
          {React.cloneElement(adornmentEnd, {
            color: 'disabled',
          })}
        </TextFieldAdornmentEndContainer>
      )}
      {adornmentStart && (
        <TextFieldAdornmentStartContainer>
          {React.cloneElement(adornmentStart, {
            color: 'disabled',
          })}
        </TextFieldAdornmentStartContainer>
      )}
    </TextFieldBaseContainer>
  );
});

export default TextField;
