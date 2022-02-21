import { ContainerProps } from '@components/Container/Container.types';
import Scrollable from '@components/Scrollable/Scrollable';
import styled, { css } from 'styled-components/native';

export const ViewContainer = styled.View<Required<ContainerProps>>`
  ${(props) => {
    return css`
      padding: ${props.header ? props.theme.spacing(0, 3) : props.theme.spacing(3)};
    `;
  }}
`;

export const ScrollViewContainer = styled(Scrollable)<Required<ContainerProps>>`
  ${(props) => {
    return css`
      padding: ${props.theme.spacing(3)};
    `;
  }}
`;
