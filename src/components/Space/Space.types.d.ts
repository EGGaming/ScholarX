import { ContainerProps } from '@components/Container/Container.types';
import { FlexAlignType, FlexStyle, StyleProp, ViewProps } from 'react-native';

export interface SpaceProps {
  spacing: number;
  direction?: 'horizontal' | 'vertical';
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexAlignType;
  container?: boolean;
  containerProps?: ContainerProps;
  grow?: boolean;
  shrink?: boolean;
  divider?: boolean;
}

export type SpaceBaseProps = Required<SpaceProps>;
