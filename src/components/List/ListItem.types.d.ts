import Icon from '@components/Icon/Icon';
import React from 'react';

export interface ListItemProps {
  onPress?: () => void;
  expandContent?: React.ReactElement<any> | React.ReactElement<any>[];
  icon?: React.ReactElement<React.ComponentProps<typeof Icon>>;
}
