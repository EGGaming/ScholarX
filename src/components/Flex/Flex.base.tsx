import { FlexProps } from '@components/Flex/Flex.types';
import styled, { css } from 'styled-components/native';

export const FlexContainer = styled.View<Required<FlexProps>>`
  ${(props) => css`
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
    ${() => {
      if (props.container)
        return css`
          padding: ${props.containerProps.header ? props.theme.spacing(0, 3) : props.theme.spacing(3)};
        `;
    }}
    flex-direction: ${props.direction};
    align-items: ${props.alignItems};
    justify-content: ${props.justifyContent};
  `}
`;
