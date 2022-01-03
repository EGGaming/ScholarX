import { ContainerProps } from '@components/Container/Container.types';
import styled, { css } from 'styled-components/native';

export const ViewContainer = styled.View<Required<ContainerProps>>`
  ${(props) => {
    return css`
      padding: ${props.theme.spacing(3)};
    `;
  }}
`;

export const ScrollViewContainer = styled.ScrollView<Required<ContainerProps>>`
  ${(props) => {
    return css`
      padding: ${props.theme.spacing(3)};
    `;
  }}
`;
