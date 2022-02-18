import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import React from 'react';
import { HoldItem } from 'react-native-hold-menu';
import { MenuProps } from './Menu.types';

const Menu: React.FC<MenuProps> = (props) => {
  switch (props.type) {
    default:
    case 'text': {
      const { items, title, buttonProps = {}, disabled } = props;
      if (disabled)
        return (
          <Button
            native
            size='small'
            variant='outlined'
            iconPlacement='right'
            icon={<Icon bundle='Feather' name='chevron-down' />}
            title={title}
            {...buttonProps}
            disabled
          />
        );
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
    }
    case 'icon': {
      const { items, icon, iconButtonProps = {}, disabled } = props;
      if (disabled) return <IconButton icon={icon} {...iconButtonProps} disabled />;
      return (
        <HoldItem items={items} activateOn='tap'>
          <IconButton icon={icon} {...iconButtonProps} />
        </HoldItem>
      );
    }
  }
};

export default React.memo(Menu);
