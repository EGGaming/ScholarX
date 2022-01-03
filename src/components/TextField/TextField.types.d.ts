import Icon from '@components/Icon/Icon';
import React from 'react';
import { TextInputProps } from 'react-native';

export type TextFieldProps = {
  width?: number | string;
};

export type TextFieldAccessoryProps = {
  adornmentEnd?: React.ReactElement<React.ComponentProps<typeof Icon>>;
  adornmentStart?: React.ReactElement<React.ComponentProps<typeof Icon>>;
};
