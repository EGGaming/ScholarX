import { useAssignmentFilterDispatch } from '@context/AssignmentFilterContext/AssignmentFilterContext';
import { useViewingClassDispatch } from '@context/ViewingClassContext/ViewingClassContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ClassAssignments from '@shared/Classes/ClassAssignments/ClassAssignments';

import React from 'react';
import { SafeAreaView } from 'react-native';

const ClassViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'ClassViewer'>> = (props) => {
  const { class: classInfo } = props.route.params;
  const dispatch = useAssignmentFilterDispatch();
  const setStudentClass = useViewingClassDispatch();

  React.useEffect(() => {
    dispatch({ type: 'IS_VIEWING_CLASS', class: classInfo });
    setStudentClass(classInfo);
  }, []);
  return (
    <SafeAreaView>
      <ClassAssignments {...props} />
    </SafeAreaView>
  );
};
export default ClassViewer;
