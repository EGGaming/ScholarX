import styled, { css } from 'styled-components/native';

export const ClassViewerGradeContainer = styled.View`
  ${(props) => css`
    background-color: ${props.theme.palette.background.default};
    padding: ${props.theme.spacing(1)};
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 100px;
    height: 100px;
    border-radius: ${props.theme.borderRadius}px;
    flex-shrink: 1;
    flex-direction: column;
  `}
`;
