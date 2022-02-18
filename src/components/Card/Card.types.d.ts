import { StyleProp, ViewStyle } from 'react-native';

export interface CardProps {
  onPress?: () => void;
  width?: string | number;
  height?: string | number;
  style?: StyleProp<ViewStyle>;
}
