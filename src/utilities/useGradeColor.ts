import { TypographyColors } from '@theme/core.types';
import React from 'react';

export default function useGradeColor(symbol: string): TypographyColors {
  return React.useMemo((): TypographyColors => {
    switch (symbol) {
      case 'A':
      case '4':
        return 'success';
      case 'B':
      case '3':
      default:
        return 'primary';
      case 'C':
      case '2':
        return 'warning';
      case 'D':
      case 'F':
      case '1':
        return 'error';
      case 'N/A':
        return 'textSecondary';
    }
  }, [symbol]);
}
