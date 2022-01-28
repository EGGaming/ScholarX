import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const AttachmentContainer = styled.View`
  ${(props) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: ${props.theme.spacing(2, 3)};
    background-color: ${props.theme.palette.background.paper};
    border-radius: ${props.theme.borderRadius}px;
  `}
`;
