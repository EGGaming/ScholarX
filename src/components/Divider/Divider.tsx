import { HorizontalDivider, VerticalDivider } from '@components/Divider/Divider.base';
import { DividerProps } from '@components/Divider/Divider.types';
import React from 'react';

const Divider: React.FC<DividerProps> = (props) => {
  const { orientation = 'horizontal' } = props;

  if (orientation === 'vertical') return <VerticalDivider />;

  return <HorizontalDivider />;
};

export default Divider;
