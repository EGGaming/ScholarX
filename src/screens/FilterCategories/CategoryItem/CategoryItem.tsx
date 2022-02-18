import Checkbox from '@components/Checkbox/Checkbox';
import ListItem from '@components/List/ListItem';
import Typography from '@components/Typography/Typography';
import {
  useAssignmentFilter,
  useAssignmentFilterDispatch,
} from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CategoryItemProps } from '@screens/FilterCategories/CategoryItem/CategoryItem.types';
import useComponentMounted from '@utilities/useComponentMounted';
import React from 'react';

const CategoryItem: React.FC<
  Omit<NativeStackScreenProps<RootStackParamList, 'FilterCategories'>['route']['params'], 'categories'> &
    CategoryItemProps
> = ({ category, checked }) => {
  const dispatch = useAssignmentFilterDispatch();

  const handleOnCheck = () => {
    dispatch({ type: 'APPEND_OR_REMOVE_ASSIGNMENT_TYPE', assignmentType: category });
  };
  return (
    <ListItem icon={<Checkbox checked={checked} onChange={handleOnCheck} />} onPress={handleOnCheck}>
      <Typography variant='body2' bold>
        {category}
      </Typography>
    </ListItem>
  );
};

export default CategoryItem;
