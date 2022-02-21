import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import ListItem from '@components/List/ListItem';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useRootNavigation } from '@navigators/Root/Root';
import Field from '@shared/Field/Field';
import { StudentClassAssignment } from '@utilities/StudentVue/types';
import { RenderItemProps } from '@utilities/TypeUtilities';
import React from 'react';
import { ListRenderItem } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const ClassItem: React.FC<StudentClassAssignment> = React.memo((props) => {
  const navigation = useRootNavigation();
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  function handleOnPress() {
    navigation.navigate('AssignmentViewer', { assignment: props });
  }
  return (
    <Animated.View style={style}>
      <ListItem onPress={handleOnPress} icon={<Icon bundle='Feather' name='chevron-right' color='primary' />}>
        <Flex direction='column'>
          <Typography numberOfLines={1} bold>
            {props.name}
          </Typography>
          <Typography numberOfLines={1} variant='caption'>
            Score: {props.score.value}
          </Typography>
          <Typography numberOfLines={1} variant='caption' color='textSecondary'>
            Points: {props.points}
          </Typography>
        </Flex>
      </ListItem>
    </Animated.View>
  );
});

const RenderClassItem: ListRenderItem<StudentClassAssignment> = ({ item }) => {
  return <ClassItem {...item} />;
};

export default RenderClassItem;
