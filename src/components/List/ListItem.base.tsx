import styled, { css } from 'styled-components/native';

export const ListItemContainer = styled.View`
  ${(props) => css`
    background-color: ${props.theme.palette.background.paper};
    padding: ${props.theme.spacing(2, 3)};
    display: flex;
    flex-direction: column;
  `}
`;
