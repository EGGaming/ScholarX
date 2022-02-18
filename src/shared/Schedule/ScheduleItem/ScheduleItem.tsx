import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import { ClassSchedule } from '@utilities/StudentVue/types';
import React from 'react';
import { ScheduleItemProps } from './ScheduleItem.types';
import { isFuture, isWithinInterval } from 'date-fns';
import { useRootNavigation } from '@navigators/Root/Root';

const ScheduleItem: React.FC<ScheduleItemProps> = ({ classSchedule, onlyShowOngoing = false, class: studentClass }) => {
  const parsedStartDate = React.useMemo(() => new Date(classSchedule.date.start), [classSchedule.date.end]);
  const parsedEndDate = React.useMemo(() => new Date(classSchedule.date.end), [classSchedule.date.end]);
  const navigation = useRootNavigation();
  const [isOccuring, setIsOccuring] = React.useState<boolean>(() =>
    isWithinInterval(new Date(), {
      start: parsedStartDate,
      end: parsedEndDate,
    })
  );

  const handleOnPress = React.useCallback(() => {
    navigation.navigate('ClassViewer', { class: studentClass });
  }, [studentClass]);

  React.useEffect(() => {
    const updater = setInterval(() => {
      setIsOccuring(() =>
        isWithinInterval(new Date(), {
          start: parsedStartDate,
          end: parsedEndDate,
        })
      );
    }, 30000);

    return () => {
      clearInterval(updater);
    };
  }, []);

  if (!isOccuring && onlyShowOngoing) {
    return null;
  }
  return (
    <Card onPress={handleOnPress}>
      <Space spacing={1} justifyContent='space-between'>
        <Flex direction='column' shrink>
          <Typography bold numberOfLines={1}>
            {classSchedule.name}
          </Typography>

          <Space spacing={0.5} alignItems='center'>
            <Icon
              bundle='MaterialCommunityIcons'
              name={isOccuring ? 'clock' : 'clock-outline'}
              color={isOccuring ? 'secondary' : isFuture(parsedStartDate) ? 'primary' : 'textSecondary'}
              size='small'
            />
            <Typography
              bold
              color={isOccuring ? 'secondary' : isFuture(parsedStartDate) ? 'primary' : 'textSecondary'}
              variant='caption'>
              {classSchedule.time.start} - {classSchedule.time.end}
            </Typography>
          </Space>
        </Flex>
        <Typography variant='caption' color='textSecondary'>
          Period {classSchedule.period}
        </Typography>
      </Space>
    </Card>
  );
};

export default ScheduleItem;
