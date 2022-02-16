import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import React from 'react';
import { HoldItem } from 'react-native-hold-menu';
import { MenuProps } from './Menu.types';

const Menu: React.FC<MenuProps> = ({ title, items, buttonProps = {} }) => {
  return (
    <HoldItem items={items} activateOn='tap'>
      <Button
        title={title}
        size='small'
        variant='outlined'
        iconPlacement='right'
        icon={<Icon bundle='Feather' name='chevron-down' />}
        {...buttonProps}
      />
    </HoldItem>
  );
};

export default React.memo(Menu);
