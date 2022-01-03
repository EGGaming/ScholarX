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
