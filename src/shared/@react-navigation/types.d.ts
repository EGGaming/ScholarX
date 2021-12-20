import { LabelPosition } from 'styled-components/native';
export interface IconScreenProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface LabelScreenProps {
  focused: boolean;
  color: string;
  position: LabelPosition;
  title: string;
}
