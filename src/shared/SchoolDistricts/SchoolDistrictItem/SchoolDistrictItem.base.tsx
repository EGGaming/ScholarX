import Card from '@components/Card/Card';
import styled, { css } from 'styled-components/native';

export const SchoolDistrictItemContainer = styled(Card)`
  ${(props) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const SchoolDistrictItemMetaContainer = styled.View`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    padding: ${props.theme.spacing(0, 1, 0, 0)};
    flex-shrink: 1;
  `}
`;

export const SchoolDistrictSelectContainer = styled.View`
  ${(props) => css`
    justify-content: center;
  `}
`;
