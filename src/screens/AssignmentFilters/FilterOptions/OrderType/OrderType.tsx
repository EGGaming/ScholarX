import Button from '@components/Button/Button';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import Menu from '@components/Menu/Menu';
import Typography from '@components/Typography/Typography';
import { Order } from '@context/AssignmentFilterContext/AssignmentFilterContext.types';
import React from 'react';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import { OrderTypeProps } from './OrderType.types';

const OrderType: React.FC<OrderTypeProps> = ({ orderType, onChange }) => {
  const items = React.useMemo(
    (): MenuItemProps[] =>
      Object.values(Order).map((text) => ({
        text,
        onPress: () => {
          onChange(text);
        },
      })),
    []
  );
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Typography bold>Order Type</Typography>
      <Menu items={items} title={orderType} />
    </Flex>
  );
};

export default OrderType;
