import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Typography from '@components/Typography/Typography';
import { DayButtonContainer, EventTinyCircle } from '@screens/Events/Day/Day.base';
import { DayProps } from '@screens/Events/Day/Day.types';
import { format } from 'date-fns';
import React from 'react';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { TouchableWithoutFeedback, View } from 'react-native';
import Space from '@components/Space/Space';
import Icon from '@components/Icon/Icon';
const Day: React.FC<DayProps> = ({ date, onIndexChange = () => void 0, isSelected, index, events }) => {
  const size = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);
  React.useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withTiming(0, { duration: 300 });
  }, []);
  const styles = useAnimatedStyle(() => ({
    transform: [{ scale: size.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));
  function handleOnPress() {
    onIndexChange(index);
  }

  console.log(`rerendering day ${index}`);

  const isHoliday = React.useMemo(() => events.some((event) => event.DayType === 'Holiday'), [events]);
  const isMaintenance = React.useMemo(
    () => events.some((event) => event.DayType === 'Regular' && event.Title === 'System Maintenance'),
    [events]
  );

  React.useEffect(() => {
    if (isSelected) size.value = withSpring(1.1);
    else size.value = withSpring(1);
  }, [isSelected]);

  return (
    <DayButtonContainer style={styles} selected={isSelected}>
      <NativeButtonBase round onPress={handleOnPress}>
        <View>
          <Space spacing={1} container direction='vertical'>
            <>
              <Typography color={isHoliday ? 'secondary' : 'textSecondary'} align='center' bold={isHoliday}>
                {format(date, 'eee')}
              </Typography>
              <Typography variant='h3' bold color={isHoliday ? 'textSecondary' : 'textPrimary'} align='center'>
                {format(date, 'd')}
              </Typography>
            </>
            <Flex alignItems='center' justifyContent='space-around'>
              {events.length > 0 && <EventTinyCircle />}
              {isMaintenance && <Icon bundle='MaterialCommunityIcons' name='cogs' size='small' color='primary' />}
              {isHoliday && <Icon bundle='MaterialCommunityIcons' name='home' size='small' color='primary' />}
            </Flex>
          </Space>
        </View>
      </NativeButtonBase>
    </DayButtonContainer>
  );
};

export default React.memo(Day, (prev, curr) => {
  return false;
});
