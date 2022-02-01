import Card from '@components/Card/Card';
import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useClassSchedule } from '@context/ClassScheduleContext/ClassScheduleContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { EventsContainer } from '@shared/Events/Events.base';
import React from 'react';
import { ScrollView } from 'react-native';

const Classes: React.FC = () => {
  const [client] = useStudentVue();
  const [schedule, setSchedule] = useClassSchedule();
  React.useEffect(() => {
    fetchScheduleFromAPI();
  }, []);
  async function fetchScheduleFromAPI() {
    const schedule = await client.classSchedule(2);
    setSchedule(schedule);
  }
  return (
    <Space spacing={1} direction='vertical'>
      <EventsContainer>
        <Typography bold variant='h3'>
          My Classes
        </Typography>
      </EventsContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {schedule
          ? schedule.classes.map((classSchedule) => (
              <Card width={300}>
                <Typography bold>{classSchedule.name}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  {classSchedule.teacher.name}
                </Typography>
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
