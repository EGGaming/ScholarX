import { AvatarBaseProps } from '@components/Avatar/Avatar.types';
import Paper from '@components/Paper/Paper';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

export const AvatarBase = styled.Image.attrs<AvatarBaseProps>((props) => ({
  source: { uri: `data:image/jpg;base64,${props.base64}` },
}))<AvatarBaseProps>`
  ${(props) => css`
    ${() => {
      switch (props.size) {
        case 'background':
          return css`
            width: 120px;
            height: 120px;
            border-radius: 30px;
          `;
        case 'regular':
          return css`
            width: 36px;
            height: 36px;
            border-radius: 18px;
          `;
      }
    }}
  `}
`;

export const AvatarContainer = styled(Paper)<Pick<AvatarBaseProps, 'size'>>`
  ${(props) => css`
    ${() => {
      switch (props.size) {
        case 'background':
          return css`
            width: 120px;
            height: 120px;
            border-radius: 30px;
          `;
        case 'regular':
          return css`
            width: 36px;
            height: 36px;
            border-radius: 18px;
          `;
      }
    }}
    margin: ${props.theme.spacing(1)};
  `}
`;
