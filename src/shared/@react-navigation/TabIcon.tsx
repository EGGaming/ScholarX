import { IconScreenProps } from '@shared/@react-navigation/types';
import Icon from '@components/Icon/Icon';
import { IconPack, IconProps } from '@components/Icon/Icon.types';
import { useAppTheme } from '@theme/core';
import React from 'react';

const TabIcon =
  <T extends IconPack>(bundle: T, name: IconProps<T>['name']) =>
  (props: IconScreenProps) => {
    const { focused } = props;
    const theme = useAppTheme();

    return <Icon bundle={bundle} name={name} color={focused ? 'primary' : 'textPrimary'} size='medium' />;
  };

export default TabIcon;
