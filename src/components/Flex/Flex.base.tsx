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
    flex-direction: ${props.direction};
    align-items: ${props.alignItems};
    justify-content: ${props.justifyContent};
  `}
`;
