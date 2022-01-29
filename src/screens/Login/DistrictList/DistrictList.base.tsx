import Container from '@components/Container/Container';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const DistrictErrorContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(3)};
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `}
`;

export const DistrictErrorImage = styled.Image.attrs((props) => {
  switch (props.theme.mode) {
    default:
    case 'light':
      return { source: require('@public/screens/Login/Error-Light.png'), resizeMode: 'contain' };
    case 'dark':
      return { source: require('@public/screens/Login/Error-Dark.png'), resizeMode: 'contain' };
  }
})`
  width: ${Dimensions.get('window').width / 1.2}px;
  height: ${Dimensions.get('window').width / 1}px;
  align-self: center;
`;

export const DistrictNotFoundImage = styled.Image.attrs((props) => {
  switch (props.theme.mode) {
    default:
    case 'light':
      return { source: require('@public/screens/Login/NotFound-Light.png'), resizeMode: 'contain' };
    case 'dark':
      return { source: require('@public/screens/Login/NotFound-Dark.png'), resizeMode: 'contain' };
  }
})`
  width: ${Dimensions.get('window').width / 1.2}px;
  height: ${Dimensions.get('window').width / 1}px;
  align-self: center;
`;
