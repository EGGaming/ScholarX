import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Chip from '@components/Chip/Chip';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
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
import Class from './Class/Class';

const Classes: React.FC = () => {
  const [client] = useStudentVue();
  const [schedule, setSchedule] = useClassSchedule();
  React.useEffect(() => {
    fetchScheduleFromAPI();
  }, []);
  async function fetchScheduleFromAPI() {
    // const schedule = await client.classSchedule(2);
    // setSchedule(schedule);
    const gradebook = await client.gradebook();
    console.log(gradebook.classes[0].assignments[0]['Assignment'].length);
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
          ? schedule.classes.map((classSchedule) => <Class key={classSchedule.name} class={classSchedule} />)
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
