import { AnimatedPaperBase, PaperBase } from '@components/Paper/Paper.base';
import { PaperProps } from '@components/Paper/Paper.types';
import React from 'react';
const Paper: React.FC<PaperProps> = ({ animated = false, ...rest }) => {
  if (animated) return <AnimatedPaperBase {...rest} />;
  return <PaperBase {...rest} />;
};
export default Paper;
