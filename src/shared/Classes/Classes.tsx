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
import { useGradebook } from '@context/GradebookContext/GradebookContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { ClassesHeaderContainer } from '@shared/Classes/Classes.base';
import { EventsContainer } from '@shared/Events/Events.base';
import { useAppTheme } from '@theme/core';
import useStateInitializer from '@utilities/useStateInitializer';
import { getQuarter } from 'date-fns';
import React from 'react';
import { ScrollView } from 'react-native';
import Class from './Class/Class';

const currentSemester = () => {
  switch (getQuarter(Date.now())) {
    case 1:
    default:
    case 2:
      return 1;
    case 3:
    case 4:
      return 2;
  }
};

const Classes: React.FC = () => {
  const [client] = useStudentVue();
  const [schedule, setSchedule] = useClassSchedule();
  const [gradebook, setGradebook] = useGradebook();
  useStateInitializer(() => client.classSchedule(currentSemester()), setSchedule);
  useStateInitializer(() => client.gradebook(), setGradebook);

  async function getGradebook() {
    await client.gradebook();
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
          onPress={getGradebook}
        />
      </ClassesHeaderContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {schedule && gradebook
          ? schedule.classes.map((classSchedule, i) => (
              <Class key={classSchedule.name} class={classSchedule} classInfo={gradebook.classes[i]} />
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
