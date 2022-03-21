import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import React from 'react';
import { ScheduleItemProps } from './ScheduleItem.types';
import { format, isFuture, isPast, isWithinInterval } from 'date-fns';
import { useRootNavigation } from '@navigators/Root/Root';
import { ScheduleItemCard } from '@shared/Schedule/ScheduleItem/ScheduleItem.base';

const ScheduleItem: React.FC<ScheduleItemProps> = ({ classSchedule, onlyShowOngoing = false, class: studentClass }) => {
  const navigation = useRootNavigation();
  const [isOccuring, setIsOccuring] = React.useState<boolean>(() =>
    isWithinInterval(new Date(), {
      start: classSchedule.date.start,
      end: classSchedule.date.end,
    })
  );

  const handleOnPress = React.useCallback(() => {
    navigation.navigate('ClassViewer', { class: studentClass });
  }, [studentClass]);

  React.useEffect(() => {
    const updater = setInterval(() => {
      setIsOccuring(() =>
        isWithinInterval(new Date(), {
          start: classSchedule.date.start,
          end: classSchedule.date.end,
        })
      );
    }, 30000);

    return () => {
      clearInterval(updater);
    };
  }, []);

  return (
    <ScheduleItemCard isOccuring={isOccuring} onPress={handleOnPress}>
      <Space spacing={1} justifyContent='space-between'>
        <Flex direction='column' shrink>
          <Typography bold numberOfLines={1}>
            {classSchedule.name}
          </Typography>

          <Space spacing={0.5} alignItems='center'>
            <Icon
              bundle='MaterialCommunityIcons'
              name={isOccuring ? 'clock' : 'clock-outline'}
              color={isOccuring ? 'secondary' : isFuture(classSchedule.date.start) ? 'primary' : 'textSecondary'}
              size='small'
            />
            <Typography
              bold
              color={isOccuring ? 'secondary' : isFuture(classSchedule.date.start) ? 'primary' : 'textSecondary'}
              variant='caption'>
              {format(classSchedule.time.start, 'hh:mm a')} - {format(classSchedule.time.end, 'hh:mm a')}
            </Typography>
          </Space>
        </Flex>
        <Typography variant='caption' color='textSecondary'>
          Period {classSchedule.period}
        </Typography>
      </Space>
    </ScheduleItemCard>
  );
};

export default ScheduleItem;
