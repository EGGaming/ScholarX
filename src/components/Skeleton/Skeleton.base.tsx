import { SkeletonBoxProps, SkeletonCircleProps, SkeletonTypographyProps } from '@components/Skeleton/Skeleton.types';
import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

function lineHeight(fontSize: number, number: number) {
  return `${(number - fontSize) / 2}px`;
}

export const SkeletonTypographyBase = styled(Animated.View)<Required<SkeletonTypographyProps>>`
  ${(props) => {
    switch (props.variant) {
      case 'body':
        return css`
          height: 18px;
          margin-vertical: ${lineHeight(18, 27)};
        `;
      case 'body2':
        return css`
          height: 15.75px;
          margin-vertical: ${lineHeight(15.75, 24)};
        `;
      case 'button':
        return css`
          height: 16px;
          margin-vertical: ${lineHeight(16, 28)};
        `;
      case 'caption':
        return css`
          height: 12px;
          margin-vertical: ${lineHeight(12, 20.25)};
        `;
      case 'h1':
        return css`
          height: 40px;
          margin-vertical: ${lineHeight(40, 50)};
        `;
      case 'h2':
        return css`
          height: 28px;
          margin-vertical: ${lineHeight(28, 36)};
        `;
      case 'h3':
        return css`
          height: 22px;
          margin-vertical: ${lineHeight(22, 30)};
        `;
    }
  }}
  ${(props) => css`
    border-radius: ${props.theme.borderRadius}px;
    width: ${typeof props.width === 'number' ? `${props.width}px` : props.width};
    background-color: ${props.theme.mode === 'dark'
      ? props.theme.palette.primary.dark
      : props.theme.palette.constants.GRAY[400]};
  `}
`;

export const SkeletonBoxBase = styled(Animated.View)<SkeletonBoxProps>`
  ${(props) => css`
    display: flex;
    border-radius: ${props.rounded ? props.theme.borderRadius : 0}px;
    background-color: ${props.theme.mode === 'dark'
      ? props.theme.palette.primary.dark
      : props.theme.palette.constants.GRAY[400]};
  `}
  ${(props) => {
    if ('width' in props) {
      return css`
        width: ${typeof props.width === 'number' ? `${props.width}px` : props.width};
      `;
    }
    if ('preset' in props) {
      switch (props.preset) {
        case 'button':
          switch (props.size) {
            default:
            case 'medium':
              return css`
                border-radius: ${props.theme.borderRadius}px;
                padding: ${props.theme.spacing(3, 2)};
              `;
            case 'small':
              return css`
                border-radius: ${props.theme.borderRadius}px;
                padding: ${props.theme.spacing(0.8, 1.5)};
              `;
          }
      }
    }
  }}
`;

export const SkeletonCircleBase = styled(Animated.View)<SkeletonCircleProps>`
  ${(props) => {
    if ('width' in props) {
      return css`
        width: ${typeof props.width === 'number' ? `${props.width}px` : props.width};
      `;
    }
    if ('preset' in props) {
      switch (props.preset) {
        case 'icon':
          switch (props.size) {
            default:
            case 'medium':
              return css`
                border-radius: 10px;
                width: 36px;
                height: 36px;
              `;
            case 'large':
              return css`
                width: 49px;
                height: 49px;
                border-radius: 16px;
              `;
            case 'card':
              return css`
                width: 65px;
                height: 65px;
                border-radius: 24px;
              `;
            case 'small':
              return css`
                width: 18px;
                height: 18px;
                border-radius: 7px;
              `;
          }
      }
    }
  }}
  ${(props) => css`
    background-color: ${props.theme.mode === 'dark'
      ? props.theme.palette.primary.dark
      : props.theme.palette.constants.GRAY[400]};
  `}
`;
