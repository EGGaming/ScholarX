import { FlexAlignType, FlexStyle, StyleProp, ViewProps } from 'react-native';

export interface SpaceProps {
  spacing: number;
  direction?: 'horizontal' | 'vertical';
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexAlignType;
  container?: boolean;
  grow?: boolean;
  shrink?: boolean;
  divider?: boolean;
}

export type SpaceBaseProps = Required<SpaceProps>;
