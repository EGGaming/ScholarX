import { TypographyProps } from '@components/Typography/Typography.types';
import { TypographyColors } from '@theme/core.types';

export interface FieldProps {
  reveal?: boolean;
  hint?: RegExp;
  text: string;
  title: string;
  typographyProps?: TypographyProps;
}
