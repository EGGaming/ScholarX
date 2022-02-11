import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Typography from '@components/Typography/Typography';
import { ClassAssignmentProps } from '@shared/Classes/ClassAssignments/ClassAssignment.types';
import RenderClassItem from '@shared/Classes/ClassItem/ClassItem';
import { StudentClassAssignment } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import React from 'react';
import { format } from 'date-fns';
import _ from 'lodash';
import { SectionList, SectionListData } from 'react-native';
import RenderClassSection from '@shared/Classes/ClassSection/ClassSection';
const keyExtractor: KeyExtractor<StudentClassAssignment> = (item) => item.gradebookId;

const ClassAssignments: React.FC<ClassAssignmentProps> = (props) => {
  const { class: studentClass, schedule } = props;

  const data: SectionListData<StudentClassAssignment, { title: string; data: StudentClassAssignment[] }>[] =
    React.useMemo(
      () =>
        _.uniqBy(studentClass.assignments, 'date.date').map((p) => ({
          title: format(new Date(p.date.date), 'EEEE, MMMM d, yyyy'),
          data: studentClass.assignments.filter((assignment) => assignment.date.date === p.date.date),
        })),
      [studentClass.assignments]
    );

  return (
    <SectionList
      sections={data}
      renderItem={RenderClassItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={10}
      initialNumToRender={15}
      renderSectionHeader={RenderClassSection}
      stickySectionHeadersEnabled
      windowSize={7}
      updateCellsBatchingPeriod={10}
    />
  );
};

export default ClassAssignments;
