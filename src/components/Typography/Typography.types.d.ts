import { TypographyColors, TypographyComponent } from '@theme/core.types';
import { TextStyle } from 'react-native';
export interface TypographyProps {
  color?: TypographyColors;
  bold?: boolean;
  italics?: boolean;
  variant?: TypographyComponent;
  hexColor?: string;
  onPress?: () => void;
  align?: TextStyle['textAlign'];
}
