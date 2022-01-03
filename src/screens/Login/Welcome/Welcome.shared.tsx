import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

export const LoginContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${(props) => css`
    padding: ${props.theme.spacing(0, 4, 4, 4)};
  `}
`;

export const EducationImage = styled.Image.attrs((props) => {
  switch (props.theme.mode) {
    default:
    case 'light':
      return { source: require('@public/screens/Login/Education-Light.png'), resizeMode: 'contain' };
    case 'dark':
      return { source: require('@public/screens/Login/Education-Dark.png'), resizeMode: 'contain' };
  }
})`
  width: ${Dimensions.get('window').width / 1.2}px;
  height: ${Dimensions.get('window').width / 1}px;
  align-self: center;
`;
