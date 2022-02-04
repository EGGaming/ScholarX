import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RenderClassItem from '@shared/Classes/ClassItem/ClassItem';
import Field from '@shared/Field/Field';
import { ClassSchedule, StudentClass, StudentClassAssignment } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import useGradeColor from '@utilities/useGradeColor';
import React from 'react';
import { FlatList } from 'react-native';
import { ClassViewerGradeContainer } from './ClassViewer.base';

const keyExtractor: KeyExtractor<StudentClassAssignment> = (item) => item.gradebookId;

const ClassViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'ClassViewer'>> = ({ navigation, route }) => {
  const { class: studentClass, schedule } = route.params;
  React.useEffect(() => {
    navigation.setOptions({ headerTitle: schedule.name });
  }, []);

  return <FlatList data={studentClass.assignments} renderItem={RenderClassItem} keyExtractor={keyExtractor} />;
};

export default ClassViewer;
