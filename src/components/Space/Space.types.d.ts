import { FlexAlignType, FlexStyle, StyleProp, ViewProps } from 'react-native';

export interface SpaceProps {
  spacing: number;
  direction?: 'horizontal' | 'vertical';
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexAlignType;
}

export type SpaceBaseProps = Required<SpaceProps>;
