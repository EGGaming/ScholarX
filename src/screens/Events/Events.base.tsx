import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const EventListContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const BlankSpacer = styled.View`
  ${(props) => css`
    width: 80px;
    margin: ${props.theme.spacing(1, 0)};
  `}
`;
