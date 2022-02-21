import Container from '@components/Container/Container';
import Paper from '@components/Paper/Paper';
import Typography from '@components/Typography/Typography';
import { ClassSectionContainer } from '@shared/Classes/ClassSection/ClassSection.base';
import { StudentClassAssignment } from '@utilities/StudentVue/types';
import React from 'react';
import { SectionListData } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const ClassSection: React.FC<{ title: string }> = React.memo(({ title }) => {
  const opacity = useSharedValue(0);
  const slide = useSharedValue(-20);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 100, easing: Easing.ease });
    slide.value = withSpring(0);
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: slide.value }],
  }));
  return (
    <ClassSectionContainer>
      <Animated.View style={style}>
        <Typography variant='caption' color='textSecondary' bold>
          {title}
        </Typography>
      </Animated.View>
    </ClassSectionContainer>
  );
});

const RenderClassSection = (info: {
  section: SectionListData<
    StudentClassAssignment,
    {
      title: string;
      data: StudentClassAssignment[];
    }
  >;
}) => {
  return <ClassSection title={info.section.title} />;
};

export default RenderClassSection;
