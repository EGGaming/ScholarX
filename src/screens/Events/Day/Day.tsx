import { ButtonBase } from '@components/Button/Button.base';
import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Typography from '@components/Typography/Typography';
import { DayButtonContainer, EventTinyCircle } from '@screens/Events/Day/Day.base';
import { DayProps } from '@screens/Events/Day/Day.types';
import { format } from 'date-fns';
import React from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { TouchableWithoutFeedback, View } from 'react-native';
import Space from '@components/Space/Space';
const Day: React.FC<DayProps> = ({ date, onIndexChange = () => void 0, index, selectedIndex, events }) => {
  const size = useSharedValue(1);
  const styles = useAnimatedStyle(() => ({
    transform: [{ scale: size.value }],
  }));
  function handleOnPress() {
    onIndexChange(index);
  }

  React.useEffect(() => {
    if (selectedIndex === index) size.value = withSpring(1.1);
    else size.value = withSpring(1);
  }, [selectedIndex]);

  return (
    <DayButtonContainer style={styles} selected={selectedIndex === index}>
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View>
          <Space spacing={1} container direction='vertical' alignItems='center'>
            <>
              <Typography color='textSecondary' numberOfLines={1}>
                {format(date, 'eee')}
              </Typography>
              <Typography variant='h3' bold>
                {format(date, 'd')}
              </Typography>
            </>
            <Space spacing={0.5}>
              {events.slice(0, 3).map((event) => (
                <EventTinyCircle key={event.Title} />
              ))}
            </Space>
          </Space>
        </View>
      </TouchableWithoutFeedback>
    </DayButtonContainer>
  );
};

export default React.memo(Day);
