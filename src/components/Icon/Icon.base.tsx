import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import OctIcons from 'react-native-vector-icons/Octicons';
import styled, { css } from 'styled-components/native';
import { IconBaseProps } from '@components/Icon/Icon.types';

export const FontAwesome5Base = styled(FontAwesome5)<IconBaseProps<typeof FontAwesome5>>`
  ${(props) => props.theme.typography[props.component]}
`;

export const AntDesignBase = styled(AntDesign)<IconBaseProps<typeof AntDesign>>`
  ${(props) => props.theme.typography[props.component]}
`;

export const MaterialCommunityIconsBase = styled(MaterialCommunityIcons)<IconBaseProps<typeof MaterialCommunityIcons>>`
  ${(props) => props.theme.typography[props.component]}
`;

export const FoundationBase = styled(Foundation)<IconBaseProps<typeof Foundation>>`
  ${(props) => props.theme.typography[props.component]}
`;

export const FeatherBase = styled(Feather)<IconBaseProps<typeof Feather>>`
  ${(props) => props.theme.typography[props.component]}
`;

export const OcticonsBase = styled(OctIcons)<IconBaseProps<typeof OctIcons>>`
  ${(props) => props.theme.typography[props.component]}
`;
