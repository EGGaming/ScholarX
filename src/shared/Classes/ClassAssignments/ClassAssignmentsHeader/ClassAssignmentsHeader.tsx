import Flex from '@components/Flex/Flex';
import Loader from '@components/Loader/Loader';
import Menu from '@components/Menu/Menu';
import Space from '@components/Space/Space';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import WeightedCategories from '@shared/Classes/ClassAssignments/WeightedCategories/WeightedCategories';
import React from 'react';
import { ClassAssignmentsHeaderProps } from '@shared/Classes/ClassAssignments/ClassAssignmentsHeader/ClassAssignmentsHeader.types';
import { useGradebook } from '@context/GradebookContext/GradebookContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';

const ClassAssignmentsHeader: React.FC<ClassAssignmentsHeaderProps> = (props) => {
  const { currentClass, studentClass } = props;
  const [gradebook, setGradebook] = useGradebook();
  const [client] = useStudentVue();

  const menuItems = React.useMemo(
    () =>
      gradebook && [
        { isTitle: true, text: 'Select Term' },
        ...gradebook.periods.map((period) => ({
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
    <>
      <Space spacing={2} direction='vertical' grow container>
        <Space spacing={1} direction='vertical'>
          <Flex grow alignItems='center' justifyContent='space-between'>
            <Typography variant='h3'>Class</Typography>

            <Menu
              items={menuItems ? menuItems : []}
              title={gradebook ? gradebook.currentPeriod.name : 'Loading...'}
              type='text'
              buttonProps={{
                disabled: !gradebook,
                icon: gradebook ? <Icon bundle='Feather' name='chevron-down' /> : <Loader />,
                iconPlacement: 'right',
              }}
            />
          </Flex>
          <Typography variant='body2' color='textSecondary'>
            {studentClass.name}
          </Typography>
        </Space>
        {currentClass?.grade.summary && <WeightedCategories summary={currentClass.grade.summary} />}
      </Space>
    </>
  );
};

export default ClassAssignmentsHeader;
