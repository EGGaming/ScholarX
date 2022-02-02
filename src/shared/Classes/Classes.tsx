import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Chip from '@components/Chip/Chip';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useClassSchedule } from '@context/ClassScheduleContext/ClassScheduleContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { ClassesHeaderContainer } from '@shared/Classes/Classes.base';
import { EventsContainer } from '@shared/Events/Events.base';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { ScrollView } from 'react-native';

const Classes: React.FC = () => {
  const [client] = useStudentVue();
  const [schedule, setSchedule] = useClassSchedule();
  const theme = useAppTheme();
  React.useEffect(() => {
    fetchScheduleFromAPI();
  }, []);
  async function fetchScheduleFromAPI() {
    const schedule = await client.classSchedule(2);
    setSchedule(schedule);
  }
  return (
    <Space spacing={1} direction='vertical'>
      <ClassesHeaderContainer>
        <Typography bold variant='h3'>
          My Classes
        </Typography>
        <Button
          title='Details'
          size='small'
          icon={<Icon bundle='Feather' name='chevron-right' />}
          iconPlacement='right'
          onPress={() => {}}
        />
      </ClassesHeaderContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {schedule
          ? schedule.classes.map((classSchedule) => (
              <Card width={300} key={classSchedule.name}>
                <Space spacing={1} direction='vertical'>
                  <>
                    <Typography variant='body2' color='textSecondary'>
                      {classSchedule.teacher.name}
                    </Typography>
                    <Typography bold numberOfLines={1}>
                      {classSchedule.name}
                    </Typography>
                  </>
                  <Button
                    title='Assignments'
                    icon={<Icon bundle='Feather' name='arrow-right' />}
                    color={theme.mode === 'dark' ? 'secondary' : 'primary'}
                    iconPlacement='right'
                    onPress={() => {}}
                    textCentered
                    variant='contained'
                  />
                </Space>
              </Card>
            ))
          : new Array(6).fill('').map((_, i) => (
              <Card key={i}>
                <Skeleton.Typography variant='h3' width={300} />
              </Card>
            ))}
      </ScrollView>
    </Space>
  );
};

export default React.memo(Classes);
