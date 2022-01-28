import { TypographyColors, TypographyComponent } from '@theme/core.types';
export interface TypographyProps {
  color?: TypographyColors;
  bold?: boolean;
  italics?: boolean;
  variant?: TypographyComponent;
  hexColor?: string;
  onPress?: () => void;
}
