import styled, { css } from 'styled-components/native';

export const TabButtonContainer = styled.View<{ selected: boolean }>`
  ${(props) => css`
    padding: ${props.theme.spacing(1.2, 2)};
    border-radius: 300px;
    ${() => {
      if (props.selected)
        return css`
          background-color: ${props.theme.palette.primary.main};
        `;
    }}
  `}
`;
export const TabButtonBaseContainer = styled.View`
  border-radius: 300px;
  overflow: hidden;
`;
