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
          ${() => {
            if (props.grow)
              return css`
                flex-grow: 1;
              `;
            if (props.shrink)
              return css`
                flex-shrink: 1;
              `;
            return css`
              display: flex;
            `;
          }}
          ${() =>
            props.fullWidth &&
            css`
              width: 100%;
            `}
          flex-direction: row;
        `;
      case 'vertical':
        return css`
          ${() => {
            if (props.grow)
              return css`
                flex-grow: 1;
              `;
            if (props.shrink)
              return css`
                flex-shrink: 1;
              `;
            return css`
              display: flex;
            `;
          }}
          ${() =>
            props.fullWidth &&
            css`
              width: 100%;
            `}
          flex-direction: column;
        `;
    }
  }}
  ${(props) => css`
    justify-content: ${props.justifyContent};
    align-items: ${props.alignItems};
  `}
  ${(props) => {
    if (props.container)
      return css`
        padding: ${props.theme.spacing(3)};
      `;
  }}
`;
