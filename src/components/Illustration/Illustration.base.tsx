import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

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

export const NotFoundImage = styled.Image.attrs((props) => {
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

export const ErrorImage = styled.Image.attrs((props) => {
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

export const NoAssignmentsImage = styled.Image.attrs((props) => {
  switch (props.theme.mode) {
    default:
    case 'light':
      return { source: require('@public/screens/Login/NoAssignments-Light.png'), resizeMode: 'contain' };
    case 'dark':
      return { source: require('@public/screens/Login/NoAssignments-Dark.png'), resizeMode: 'contain' };
  }
})`
  width: ${Dimensions.get('window').width / 1.2}px;
  height: ${Dimensions.get('window').width / 1}px;
  align-self: center;
`;
