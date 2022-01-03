import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import Space from '@components/Space/Space';

export const SignInContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  display: flex;
  flex-direction: column;
  ${(props) => css`
    padding: ${props.theme.spacing(4)};
  `}
`;

export const BackButtonContainer = styled.View`
  ${(props) => css`
    display: flex;
    flex-direction: row;
    padding: ${props.theme.spacing(2, 0)};
  `}
`;

export const StateContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const SignInWrapper = styled(Space)`
  ${(props) => css`
    padding: ${props.theme.spacing(2, 0)};
  `}
`;
