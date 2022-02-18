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
import {
  useAssignmentFilter,
  useAssignmentFilterOfClass,
} from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { Order } from '@context/AssignmentFilterContext/AssignmentFilterContext.types';
const keyExtractor: KeyExtractor<StudentClassAssignment> = (item) => item.gradebookId;

const ClassAssignments: React.FC<ClassAssignmentProps> = (props) => {
  const { class: studentClass } = props;
  const filters = useAssignmentFilterOfClass();

  const data: SectionListData<StudentClassAssignment, { title: string; data: StudentClassAssignment[] }>[] =
    React.useMemo(() => {
      if (filters) {
        let assignments = studentClass.assignments;

        if (filters.withDropbox) assignments = assignments.filter((assignment) => assignment.hasDropBox === true);

        switch (filters.orderType) {
          case Order.ASCENDING:
            assignments = _.sortBy(_.uniqBy(assignments, 'date.date'), ['date.date']).reverse();
            break;
          case Order.DESCENDING:
            assignments = _.sortBy(_.uniqBy(assignments, 'date.date'), ['date.date']);
            break;
        }

        return assignments.map((p) => ({
          title: format(new Date(p.date.date), 'EEEE, MMMM d, yyyy'),
          data: assignments.filter((assignment) => assignment.date.date === p.date.date),
        }));
      }
      return [];
    }, [studentClass.assignments, filters]);

  return (
    <SectionList
      sections={data}
      renderItem={RenderClassItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={10}
      initialNumToRender={20}
      renderSectionHeader={RenderClassSection}
      stickySectionHeadersEnabled
      windowSize={7}
      updateCellsBatchingPeriod={10}
    />
  );
};

export default ClassAssignments;
