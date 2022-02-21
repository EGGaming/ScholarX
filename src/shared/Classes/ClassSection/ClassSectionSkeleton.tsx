import Skeleton from '@components/Skeleton/Skeleton';
import { ClassSectionContainer } from '@shared/Classes/ClassSection/ClassSection.base';
import React from 'react';

const ClassSectionSkeleton: React.FC = (props) => {
  const {} = props;
  return (
    <ClassSectionContainer>
      <Skeleton.Typography variant='caption' width={150} />
    </ClassSectionContainer>
  );
};

export default React.memo(ClassSectionSkeleton);
