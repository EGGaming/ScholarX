import styled, { css } from 'styled-components/native';

export const NotificationViewerContainer = styled.ScrollView`
  ${(props) => css`
    padding: ${props.theme.spacing(3, 3, 8, 3)};
  `}
`;
