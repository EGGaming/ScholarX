import { ContainerProps } from '@components/Container/Container.types';
import { FlexStyle } from 'react-native';

export interface FlexProps {
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexStyle['alignItems'];
  direction?: FlexStyle['flexDirection'];
  grow?: boolean;
  shrink?: boolean;
  container?: boolean;
  containerProps?: ContainerProps;
}
