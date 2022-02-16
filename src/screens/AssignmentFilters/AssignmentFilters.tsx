import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Menu from '@components/Menu/Menu';
import Space from '@components/Space/Space';
import Switch from '@components/Switch/Switch';
import Typography from '@components/Typography/Typography';
import { useAssignmentFilter } from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { FieldVisibility } from '@context/AssignmentFilterContext/AssignmentFilterContext.types';
import React from 'react';
import { ScrollView } from 'react-native';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import StudentDropbox from './FilterOptions/StudentDropbox/StudentDropbox';

const AssignmentFilters: React.FC = () => {
  const [filters, dispatch] = useAssignmentFilter();

  function handleOnChange(e: boolean) {
    dispatch({ type: 'ADD_FILTER', key: 'withDropbox', value: e });
  }

  return (
    <ScrollView>
      <Space direction='vertical' container spacing={1}>
        <StudentDropbox onChange={handleOnChange} withDropbox={filters.withDropbox} />
      </Space>
    </ScrollView>
  );
};

export default AssignmentFilters;
