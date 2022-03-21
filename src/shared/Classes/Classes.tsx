import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Chip from '@components/Chip/Chip';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Loader from '@components/Loader/Loader';
import Menu from '@components/Menu/Menu';
import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useClassSchedule } from '@context/ClassScheduleContext/ClassScheduleContext';
import { useGradebook } from '@context/GradebookContext/GradebookContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import ClassSkeleton from '@shared/Classes/Class/ClassSkeleton';
import { ClassesHeaderContainer } from '@shared/Classes/Classes.base';
import { EventsContainer } from '@shared/Events/Events.base';
import { useAppTheme } from '@theme/core';
import useStateInitializer from '@utilities/useStateInitializer';
import { getQuarter } from 'date-fns';
import React from 'react';
import { ScrollView } from 'react-native';
import { HoldItem } from 'react-native-hold-menu';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import Class from './Class/Class';

const Classes: React.FC = () => {
  const [client] = useStudentVue();
  const [schedule, setSchedule] = useClassSchedule();
  const [gradebook, setGradebook] = useGradebook();
  useStateInitializer(() => client.schedule(), setSchedule);
  useStateInitializer(() => client.gradebook(), setGradebook);
  const menuItems = React.useMemo(
    () =>
      gradebook && [
        { isTitle: true, text: 'Select Term' },
        ...gradebook.reportingPeriod.available.map((period) => ({
          text: period.name,
          onPress: async () => {
            setGradebook(undefined);
            const gradebookAtPeriod = await client.gradebook(period.index);
            setGradebook(gradebookAtPeriod);
          },
        })),
      ],
    [gradebook, client, setGradebook]
  );
  return (
    <Space spacing={1} direction='vertical'>
      <ClassesHeaderContainer>
        <Typography bold variant='h3'>
          My Classes
        </Typography>
        <Menu
          items={menuItems ? menuItems : []}
          title={gradebook ? gradebook.reportingPeriod.current.name : 'Loading...'}
          type='text'
          buttonProps={{
            disabled: !gradebook,
            icon: gradebook ? <Icon bundle='Feather' name='chevron-down' /> : <Loader />,
            iconPlacement: 'right',
          }}
        />
      </ClassesHeaderContainer>

      <Flex direction='column'>
        {gradebook
          ? gradebook.courses.map((studentClass, i) => <Class key={studentClass.title} classInfo={studentClass} />)
          : new Array(6).fill('').map((_, i) => <ClassSkeleton key={i} />)}
      </Flex>
    </Space>
  );
};

export default React.memo(Classes);
