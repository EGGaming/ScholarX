import { IconScreenProps } from '@shared/@react-navigation/types';
import Icon, { IconPack, IconProps } from '@components/Icon/Icon';
import { useAppTheme } from '@theme/core';
import React from 'react';

const TabIcon =
  <T extends IconPack>(bundle: T, name: IconProps<T>['name']) =>
  (props: IconScreenProps) => {
    const { focused } = props;
    const theme = useAppTheme();

    const hexColor = React.useMemo(
      () => (focused ? theme.palette.primary.main : theme.palette.text.disabled),
      [focused, theme]
    );
    return <Icon bundle={bundle} name={name} color='inherit' hexColor={hexColor} />;
  };

export default TabIcon;
