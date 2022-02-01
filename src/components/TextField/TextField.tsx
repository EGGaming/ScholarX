import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import {
  TextFieldAdornmentEndContainer,
  TextFieldAdornmentStartContainer,
  TextFieldBase,
  TextFieldBaseContainer,
} from '@components/TextField/TextField.base';
import { TextFieldAccessoryProps, TextFieldProps } from '@components/TextField/TextField.types';
import Typography from '@components/Typography/Typography';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { TextInputProps } from 'react-native';

const TextField = React.forwardRef((props: TextFieldProps & TextInputProps & TextFieldAccessoryProps, ref) => {
  const { width = 150, adornmentEnd, adornmentStart, size = 'medium', clearButton, error, ...otherProps } = props;
  const theme = useAppTheme();
  return (
    <TextFieldBaseContainer width={width}>
      <Space direction='vertical' spacing={0.5} grow>
        <TextFieldBase
          error={error}
          ref={ref as any}
          placeholderTextColor={theme.palette.text.disabled}
          adornmentEnd={adornmentEnd}
          adornmentStart={adornmentStart}
          size={size}
          {...otherProps}
        />
        {error && (
          <Typography color='error' variant='body2'>
            * {error}
          </Typography>
        )}
      </Space>
      {adornmentEnd && (
        <TextFieldAdornmentEndContainer size={size}>
          {adornmentEnd &&
            React.cloneElement(adornmentEnd, {
              color: 'disabled',
            })}
        </TextFieldAdornmentEndContainer>
      )}
      {adornmentStart && (
        <TextFieldAdornmentStartContainer size={size}>
          {React.cloneElement(adornmentStart, {
            color: 'disabled',
          })}
        </TextFieldAdornmentStartContainer>
      )}
    </TextFieldBaseContainer>
  );
});

export default TextField;
