import Avatar from '@components/Avatar/Avatar';
import Badge from '@components/Badge/Badge';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { BottomTabHeaderContainer, StatusBarSpace } from '@shared/@react-navigation/Header/Header.shared';
import NotificationBell from '@shared/NotificationBell/NotificationBell';
import { useAppTheme } from '@theme/core';
import React from 'react';

const Header: React.FC<BottomTabHeaderProps> = (props) => {
  return (
    <>
      <StatusBarSpace />
      <BottomTabHeaderContainer>
        <Typography bold>{props.options.tabBarLabel}</Typography>
        <Space spacing={1} alignItems='center'>
          <NotificationBell />
          <Avatar size='small' />
        </Space>
      </BottomTabHeaderContainer>
    </>
  );
};

export default React.memo(Header);
