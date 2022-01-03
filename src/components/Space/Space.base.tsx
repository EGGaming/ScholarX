import { SpaceBaseProps } from '@components/Space/Space.types';
import React from 'react';
import styled, { css } from 'styled-components/native';

export const SpaceBase = styled.View<SpaceBaseProps>`
  ${(props) => {
    switch (props.direction) {
      case 'horizontal':
        return css`
          padding: ${props.theme.spacing(0, props.spacing)};
        `;
      case 'vertical':
        return css`
          padding: ${props.theme.spacing(props.spacing, 0)};
        `;
    }
  }}
`;

export const SpaceBaseContainer = styled.View<SpaceBaseProps>`
  ${(props) => {
    switch (props.direction) {
      case 'horizontal':
        return css`
          display: flex;
          flex-direction: row;
        `;
      case 'vertical':
        return css`
          display: flex;
          flex-direction: column;
        `;
    }
  }}
  ${(props) => css`
    justify-content: ${props.justifyContent};
    align-items: ${props.alignItems};
  `}
`;
