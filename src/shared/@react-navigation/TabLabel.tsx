import { LabelScreenProps } from '@shared/@react-navigation/types';
import Typography from '@components/Typography/Typography';
import React from 'react';

const TabLabel: React.FC<LabelScreenProps> = (props: LabelScreenProps) => {
  const { focused, title } = props;
  return (
    <Typography variant='tab' bold={focused} color={focused ? 'textPrimary' : 'disabled'}>
      {title}
    </Typography>
  );
};

export default TabLabel;
