import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Typography from '@components/Typography/Typography';
import { ClassAssignmentProps } from '@shared/Classes/ClassAssignments/ClassAssignment.types';
import RenderClassItem from '@shared/Classes/ClassItem/ClassItem';
import { StudentClass, StudentClassAssignment } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import React from 'react';
import { format } from 'date-fns';
import _ from 'lodash';
import { Dimensions, SectionList, SectionListData } from 'react-native';
import RenderClassSection from '@shared/Classes/ClassSection/ClassSection';
import {
  useAssignmentFilter,
  useAssignmentFilterOfClass,
} from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { Order } from '@context/AssignmentFilterContext/AssignmentFilterContext.types';
import Flex from '@components/Flex/Flex';
import { useGradebook } from '@context/GradebookContext/GradebookContext';
import Space from '@components/Space/Space';
import Button from '@components/Button/Button';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { HoldItem } from 'react-native-hold-menu';
import Icon from '@components/Icon/Icon';
import Loader from '@components/Loader/Loader';
import Menu from '@components/Menu/Menu';
import Card from '@components/Card/Card';
import { PieChart, StackedBarChart } from 'react-native-chart-kit';
import { useAppTheme } from '@theme/core';
import WeightedCategories from '@shared/Classes/ClassAssignments/WeightedCategories/WeightedCategories';
import ClassAssignmentsHeader from '@shared/Classes/ClassAssignments/ClassAssignmentsHeader/ClassAssignmentsHeader';
import ClassSectionSkeleton from '@shared/Classes/ClassSection/ClassSectionSkeleton';
import ClassItemSkeleton from '@shared/Classes/ClassItem/ClassItemSkeleton';
import { useIsFocused } from '@react-navigation/native';
import ClassAssignmentEmpty from '@shared/Classes/ClassAssignments/ClassAssignmentEmpty/ClassAssignmentEmpty';
import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { Animated } from 'react-native';
import { useCollapsibleHeader, UseCollapsibleOptions } from 'react-navigation-collapsible';
import Header from '@shared/@react-navigation/Header';
import IconButton from '@components/IconButton/IconButton';
import { StackHeaderProps } from '@react-navigation/stack';
import { InteractionManager } from 'react-native';
const keyExtractor: KeyExtractor<StudentClassAssignment> = (item) => item.gradebookId;

const ClassAssignments: React.FC<NativeStackScreenProps<RootStackParamList, 'ClassViewer'>> = (props) => {
  const {
    route: {
      params: { class: studentClass },
    },
    navigation,
  } = props;
  const theme = useAppTheme();

  const options: UseCollapsibleOptions = {
    navigationOptions: {
      headerMode: 'screen',
      headerTitle: '',
      header: (props: JSX.IntrinsicAttributes & StackHeaderProps) => <Header {...props} />,
      headerRight: () => (
        <IconButton
          icon={<Icon bundle='Feather' name='filter' />}
          onPress={() => {
            navigation.navigate('AssignmentFilters');
          }}
        />
      ),
    },
    config: {
      useNativeDriver: true,
      collapsedColor: theme.palette.background.default,
    },
  };
  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } = useCollapsibleHeader(options);

  const filters = useAssignmentFilterOfClass();
  const [gradebook] = useGradebook();
  const [currentClass, setCurrentClass] = React.useState<StudentClass>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const isFocused = useIsFocused();
  const [data, setData] = React.useState<
    SectionListData<StudentClassAssignment, { title: string; data: StudentClassAssignment[] }>[]
  >([]);

  React.useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, [gradebook, filters, isFocused]);

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (isFocused && filters && gradebook != null) {
        setData([]);
        let currentClass = gradebook.classes.find((p) => p.staff.staffgu === studentClass.staff.staffgu);
        setCurrentClass(currentClass);
        if (currentClass == null) return;
        let assignments = currentClass.assignments;

        switch (filters.orderType) {
          case Order.ASCENDING:
            assignments = _.sortBy(assignments, ['date.date']).reverse();
            break;
          case Order.DESCENDING:
            assignments = _.sortBy(assignments, ['date.date']);
            break;
        }

        if (filters.withDropbox) assignments = assignments.filter((assignment) => assignment.hasDropBox === true);

        if (filters.selectedAssignments.length > 0)
          assignments = assignments.filter((assignment) =>
            filters.selectedAssignments.some((type) => assignment.type === type)
          );

        let sectionDates = _.uniqBy(assignments, 'date.date').map((assignment) => assignment.date.date);

        setData(
          sectionDates.map((p) => {
            const { match, other } = assignments.reduce(
              (prev, current) => {
                return current.date.date === p
                  ? { ...prev, match: [...prev.match, current] }
                  : { ...prev, other: [...prev.other, current] };
              },
              { match: [] as StudentClassAssignment[], other: [] as StudentClassAssignment[] }
            );
            assignments = other;
            return {
              title: format(new Date(p), 'EEEE, MMMM d, yyyy'),
              data: match,
            };
          })
        );
        setLoading(false);
      }
    });
  }, [gradebook, filters, isFocused]);

  if (loading)
    return (
      <Animated.View style={{ paddingTop: containerPaddingTop }}>
        <Flex direction='column'>
          <ClassAssignmentsHeader studentClass={studentClass} />
          <ClassSectionSkeleton />
          <ClassItemSkeleton />
          <ClassItemSkeleton />
          <ClassItemSkeleton />
          <ClassSectionSkeleton />
          <ClassItemSkeleton />
          <ClassSectionSkeleton />
          <ClassItemSkeleton />
        </Flex>
      </Animated.View>
    );

  return (
    <Animated.SectionList
      onScroll={onScroll}
      contentContainerStyle={{ paddingTop: containerPaddingTop }}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
      sections={data}
      renderItem={RenderClassItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={<ClassAssignmentsHeader currentClass={currentClass} studentClass={studentClass} />}
      ListEmptyComponent={<ClassAssignmentEmpty />}
      showsVerticalScrollIndicator
      maxToRenderPerBatch={12}
      initialNumToRender={10}
      renderSectionHeader={RenderClassSection}
      windowSize={7}
      updateCellsBatchingPeriod={10}
    />
  );
};

export default ClassAssignments;
