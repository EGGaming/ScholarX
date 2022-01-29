import React from 'react';
import { LoaderProps } from '@components/Loader/Loader.types';
import styled, { css } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const LoaderBase = styled.ActivityIndicator.attrs((props) => {
  const defaultProps: React.ComponentProps<typeof ActivityIndicator> = {
    color: props.theme.palette.primary.dark,
  };
  switch (props.size) {
    case 'small':
      return {
        ...defaultProps,
        size: 18,
      };
    default:
    case 'medium':
      return {
        ...defaultProps,
        size: 26,
      };
    case 'large':
      return {
        ...defaultProps,
        size: 34,
      };
  }
})<LoaderProps>``;
