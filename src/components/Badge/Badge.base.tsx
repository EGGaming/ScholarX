import { BadgeProps } from '@components/Badge/Badge.types';
import styled, { css } from 'styled-components/native';

export const BadgeBase = styled.View<Required<BadgeProps>>`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 12px;
  height: 12px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
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
