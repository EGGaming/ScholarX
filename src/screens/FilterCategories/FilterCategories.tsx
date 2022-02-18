import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Checkbox from '@components/Checkbox/Checkbox';
import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Flex from '@components/Flex/Flex';
import Floating from '@components/Floating/Floating';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import ListItem from '@components/List/ListItem';
import Paper from '@components/Paper/Paper';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import {
  AssignmentFilterField,
  useAssignmentCategories,
  useAssignmentFilterDispatch,
} from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CategoryItem from '@screens/FilterCategories/CategoryItem/CategoryItem';
import React from 'react';
import { ScrollView, View } from 'react-native';

const FilterCategories: React.FC = () => {
  const selectedCategories = React.useContext(AssignmentFilterField.selectedAssignments);
  const categories = useAssignmentCategories();
  const dispatch = useAssignmentFilterDispatch();
  function handleOnDeselectAll() {
    dispatch({ type: 'DESELECT_ALL_ASSIGNMENT_TYPES' });
  }

  return (
    <ScrollView>
      <Space spacing={1} direction='vertical'>
        <Container>
          <Typography bold align='center'>
            Select categories below
          </Typography>
          <Typography align='center' variant='body2' color='textSecondary'>
            Tap on a category to add it to the filter
          </Typography>
        </Container>
        <Paper>
          <Space spacing={0} divider direction='vertical'>
            {categories.map((category) => (
              <CategoryItem
                checked={selectedCategories.some((selected) => category === selected)}
                category={category}
              />
            ))}
          </Space>
        </Paper>
      </Space>
      <Floating visible={selectedCategories.length > 0} verticalPlacement='bottom' horizontalPlacement='center'>
        <Card>
          <Space spacing={1} justifyContent='space-between' alignItems='center'>
            <Typography variant='body2'>
              Selected{' '}
              <Typography variant='body2' color='primary'>
                {selectedCategories.length}
              </Typography>{' '}
              {selectedCategories.length === 1 ? 'category' : 'categories'}
            </Typography>
            <Button title='Deselect All' size='small' onPress={handleOnDeselectAll} />
          </Space>
        </Card>
      </Floating>
    </ScrollView>
  );
};

export default React.memo(FilterCategories);
