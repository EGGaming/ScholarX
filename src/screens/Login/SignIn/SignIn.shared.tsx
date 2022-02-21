import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

export const SignInContainer = styled.KeyboardAvoidingView`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  display: flex;
  flex-direction: column;
  ${(props) => css`
    padding: ${props.theme.spacing(3)};
  `};
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

export const SignInWrapper = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(4, 0, 0, 0)};
  `}
`;
