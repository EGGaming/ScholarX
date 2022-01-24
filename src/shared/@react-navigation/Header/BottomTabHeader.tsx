import Badge from '@components/Badge/Badge';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Typography from '@components/Typography/Typography';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { BottomTabHeaderContainer } from '@shared/@react-navigation/Header/Header.shared';
import NotificationBell from '@shared/NotificationBell/NotificationBell';
import { useAppTheme } from '@theme/core';
import React from 'react';

const Header: React.FC<BottomTabHeaderProps> = (props) => {
  return (
    <BottomTabHeaderContainer>
      <IconButton icon={<Icon bundle='Feather' name='menu' />} onPress={() => {}} />
      <Typography color='textPrimary' bold>
        {props.options.tabBarLabel}
      </Typography>
      <NotificationBell />
    </BottomTabHeaderContainer>
  );
};

export default React.memo(Header);
