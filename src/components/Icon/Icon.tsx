import React from 'react';

import { useAppTheme } from '@theme/core';
import { IconPack, IconProps } from '@components/Icon/Icon.types';
import {
  AntDesignBase,
  FeatherBase,
  FontAwesome5Base,
  FoundationBase,
  MaterialCommunityIconsBase,
  OcticonsBase,
} from '@components/Icon/Icon.base';

function Icon<T extends IconPack>(props: IconProps<T>) {
  const { bundle, name, color = 'textPrimary', component = 'body', hexColor = '' } = props;
  const theme = useAppTheme();

  const themeColor = React.useMemo(() => {
    if (color === 'inherit') return hexColor;
    return theme.palette.toColorValue(color);
  }, [color]);

  switch (bundle) {
    case 'FontAwesome5':
      return <FontAwesome5Base name={name} color={themeColor} component={component} />;
    case 'AntDesign':
      return <AntDesignBase name={name} color={themeColor} component={component} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIconsBase name={name} color={themeColor} component={component} />;
    case 'Foundation':
      return <FoundationBase name={name} color={themeColor} component={component} />;
    case 'Feather':
      return <FeatherBase name={name} color={themeColor} component={component} />;
    case 'Octicons':
      return <OcticonsBase name={name} color={themeColor} component={component} />;
    default:
      return null;
  }
}

export default Icon;
