import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const FindMySchoolDistrictKeyboardAvoidingContainer = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  keyboardVerticalOffset: 32,
})`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const FindMySchoolDistrictContainer = styled.View`
  ${(props) => css`
    padding: ${props.theme.spacing(4)};
  `}
`;

export const LocationImage = styled.Image.attrs((props) => {
  switch (props.theme.mode) {
    default:
    case 'light':
      return { source: require('@public/screens/Login/Location-Light.png'), resizeMode: 'contain' };
    case 'dark':
      return { source: require('@public/screens/Login/Location-Dark.png'), resizeMode: 'contain' };
  }
})`
  width: ${Dimensions.get('window').width / 1.2}px;
  height: ${Dimensions.get('window').width / 1}px;
  align-self: center;
`;
