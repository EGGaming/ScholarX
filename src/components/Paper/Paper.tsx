import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

const Paper = styled.View`
  ${() => {
    switch (Platform.OS) {
      case 'android':
        return css`
          elevation: 5;
        `;
      case 'ios':
        return css`
          shadow-color: #000;
          shadow-offset: 0px 2px;
          shadow-opacity: 0.25;
          shadow-radius: 3.84px;
        `;
    }
  }}
  ${(props) => css`
    background-color: ${props.theme.palette.background.paper};
  `}
`;

export default Paper;
