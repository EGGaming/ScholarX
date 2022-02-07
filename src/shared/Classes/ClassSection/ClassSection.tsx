import Container from '@components/Container/Container';
import Paper from '@components/Paper/Paper';
import Typography from '@components/Typography/Typography';
import { ClassSectionContainer } from '@shared/Classes/ClassSection/ClassSection.base';
import { StudentClassAssignment } from '@utilities/StudentVue/types';
import React from 'react';
import { SectionListData, SectionListRenderItem } from 'react-native';

const ClassSection: React.FC<{ title: string }> = React.memo(({ title }) => {
  return (
    <ClassSectionContainer>
      <Typography variant='body2' color='textSecondary' bold>
        {title}
      </Typography>
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
