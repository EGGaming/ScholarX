import React from 'react';

export interface ListItemProps {
  onPress?: () => void;
  expandContent?: React.ReactElement<any> | React.ReactElement<any>[];
}
