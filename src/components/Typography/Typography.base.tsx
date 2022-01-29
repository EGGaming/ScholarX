import styled, { css } from 'styled-components/native';
import { RequireAll } from '@utilities/TypeUtilities';
import { TypographyProps } from '@components/Typography/Typography.types';

export const TypographyBase = styled.Text<RequireAll<Omit<TypographyProps, 'onPress'>>>`
  ${(props) => css`
    color: ${() => {
      if (props.color === 'inherit') return props.hexColor;
      return props.theme.palette.toColorValue(props.color);
    }};
    font-weight: ${props.bold ? props.theme.typography.constants.bold : props.theme.typography.constants.regular};
    text-align: ${props.align};
    ${props.theme.typography[props.variant]}
  `}
`;
