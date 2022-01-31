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
  const { bundle, name, color = 'textPrimary', size = 'medium', hexColor = '' } = props;
  const theme = useAppTheme();

  const themeColor = React.useMemo(() => {
    if (color === 'inherit') return hexColor;
    return theme.palette.toColorValue(color);
  }, [color]);

  const numSize = React.useMemo(() => {
    switch (size) {
      case 'card':
        return 48;
      case 'large':
        return 32;
      default:
      case 'medium':
        return 20;
      case 'small':
        return 14;
    }
  }, [size]);

  switch (bundle) {
    case 'FontAwesome5':
      return <FontAwesome5Base name={name} color={themeColor} size={numSize} />;
    case 'AntDesign':
      return <AntDesignBase name={name} color={themeColor} size={numSize} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIconsBase name={name} color={themeColor} size={numSize} />;
    case 'Foundation':
      return <FoundationBase name={name} color={themeColor} size={numSize} />;
    case 'Feather':
      return <FeatherBase name={name} color={themeColor} size={numSize} />;
    case 'Octicons':
      return <OcticonsBase name={name} color={themeColor} size={numSize} />;
    default:
      return null;
  }
}

export default Icon;
