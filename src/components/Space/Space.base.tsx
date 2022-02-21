import { SpaceBaseProps } from '@components/Space/Space.types';
import React from 'react';
import styled, { css } from 'styled-components/native';

export const SpaceBase = styled.View<SpaceBaseProps>`
  ${(props) => {
    switch (props.direction) {
      case 'horizontal':
        return css`
          margin: ${props.theme.spacing(0, props.spacing)};
        `;
      case 'vertical':
        return css`
          margin: ${props.theme.spacing(props.spacing, 0)};
        `;
    }
  }}
  ${(props) =>
    props.divider &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${props.theme.palette.divider};
    `}
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
        padding: ${props.containerProps.header ? props.theme.spacing(0, 3) : props.theme.spacing(3)};
      `;
  }}
`;
