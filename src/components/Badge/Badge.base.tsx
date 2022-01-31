import { BadgeProps } from '@components/Badge/Badge.types';
import { AppColors } from '@theme/core.types';
import styled, { css } from 'styled-components/native';

export const BadgeBase = styled.View<Required<BadgeProps>>`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 10px;
  height: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  ${(props) => {
    if (props.color === 'inherit')
      return css`
        background-color: ${props.hexColor};
      `;
    return css`
      background-color: ${props.theme.palette[props.color].main};
    `;
  }}
`;

export const BadgeBaseContainer = styled.View`
  position: relative;
`;

export const BadgeText = styled.Text<{ color: AppColors; hexColor?: string }>`
  ${(props) => css`
    color: ${() => {
      if (props.color === 'inherit') return props.theme.palette.getContrastText(props.hexColor!);

      return props.theme.palette.getContrastText(props.theme.palette.toColorValue(props.color));
    }};
    font-size: 10px;
  `}
`;
