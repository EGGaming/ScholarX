import Button from '@components/Button/Button';
import Chip from '@components/Chip/Chip';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Menu from '@components/Menu/Menu';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAssignmentFilterDispatch } from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { useViewingClass } from '@context/ViewingClassContext/ViewingClassContext';
import { useRootNavigation } from '@navigators/Root/Root';
import _, { assign } from 'lodash';
import React from 'react';
import { ScrollView } from 'react-native';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import { ShowOnlyCategoriesProps } from './ShowOnlyCategories.types';

const ShowOnlyCategories: React.FC<ShowOnlyCategoriesProps> = ({ selectedAssignments }) => {
  const [studentClass] = useViewingClass();
  const dispatch = useAssignmentFilterDispatch();
  const navigation = useRootNavigation();

  function handleOnPress() {
    navigation.navigate('FilterCategories');
  }

  return (
    <Space spacing={1} direction='vertical'>
      <Flex alignItems='center' justifyContent='space-between'>
        <Typography bold>Categories</Typography>
        <Button title='Category' size='small' icon={<Icon bundle='AntDesign' name='plus' />} onPress={handleOnPress} />
      </Flex>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderToHardwareTextureAndroid>
        <Space spacing={1} alignItems='center' shrink>
          {selectedAssignments.map((assignment) => (
            <Chip
              key={assignment}
              title={assignment}
              visible
              onRemove={() => {
                dispatch({ type: 'REMOVE_ASSIGNMENT_TYPE', assignmentType: assignment });
              }}
            />
          ))}
        </Space>
      </ScrollView>
    </Space>
  );
};

export default React.memo(ShowOnlyCategories);
