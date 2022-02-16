import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Space from '@components/Space/Space';
import Tab from '@components/Tabs/Tab/Tab';
import Tabs from '@components/Tabs/Tabs';
import Typography from '@components/Typography/Typography';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ClassAssignments from '@shared/Classes/ClassAssignments/ClassAssignments';
import RenderClassItem from '@shared/Classes/ClassItem/ClassItem';
import Field from '@shared/Field/Field';
import { ClassSchedule, StudentClass, StudentClassAssignment } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import useGradeColor from '@utilities/useGradeColor';
import React from 'react';
import { FlatList } from 'react-native';
import { ClassViewerGradeContainer } from './ClassViewer.base';

const ClassViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'ClassViewer'>> = ({ navigation, route }) => {
  const { class: classInfo } = route.params;
  React.useEffect(() => {
    navigation.setOptions({ headerTitle: classInfo.name });
  }, []);

  return <ClassAssignments {...route.params} />;
};

export default ClassViewer;
