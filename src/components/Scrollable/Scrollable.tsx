import { ScrollableBase } from '@components/Scrollable/Scrollable.base';
import React from 'react';
import { ScrollViewProps } from 'react-native';

const Scrollable: React.FC<ScrollViewProps> = (props) => {
  return <ScrollableBase {...props} />;
};

export default Scrollable;
