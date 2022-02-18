import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Menu from '@components/Menu/Menu';
import Space from '@components/Space/Space';
import Switch from '@components/Switch/Switch';
import Typography from '@components/Typography/Typography';
import {
  useAssignmentFilter,
  useAssignmentFilterDispatch,
  useAssignmentFilterOfClass,
} from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { Order } from '@context/AssignmentFilterContext/AssignmentFilterContext.types';
import React from 'react';
import { ScrollView } from 'react-native';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import OrderType from './FilterOptions/OrderType/OrderType';
import ShowOnlyCategories from './FilterOptions/ShowOnlyCategories/ShowOnlyCategories';
import StudentDropbox from './FilterOptions/StudentDropbox/StudentDropbox';

const AssignmentFilters: React.FC = () => {
  const filters = useAssignmentFilterOfClass();
  const dispatch = useAssignmentFilterDispatch();
  const handleOnStudentDropboxChange = React.useCallback(
    (e: boolean) => {
      dispatch({ type: 'ADD_FILTER', key: 'withDropbox', value: e });
    },
    [dispatch]
  );

  const handleOnOrderTypeChange = React.useCallback(
    (e: Order) => {
      dispatch({ type: 'ADD_FILTER', key: 'orderType', value: e });
    },
    [dispatch]
  );

  if (filters)
    return (
      <ScrollView>
        <Space direction='vertical' container spacing={1}>
          <OrderType onChange={handleOnOrderTypeChange} orderType={filters.orderType} />
          <StudentDropbox onChange={handleOnStudentDropboxChange} withDropbox={filters.withDropbox} />
          <ShowOnlyCategories />
        </Space>
      </ScrollView>
    );

  return null;
};

export default AssignmentFilters;
