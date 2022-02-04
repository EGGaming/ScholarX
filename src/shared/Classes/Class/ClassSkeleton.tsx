import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import { GradeSymbolContainer, ClassInfoContainer } from '@shared/Classes/Class/Class.base';
import React from 'react';

const ClassSkeleton: React.FC = () => {
  return (
    <Space spacing={1}>
      <GradeSymbolContainer>
        <Skeleton.Typography variant='h1' width={40} />
        <Skeleton.Typography variant='body2' width={60} />
      </GradeSymbolContainer>
      <ClassInfoContainer>
        <Skeleton.Typography width='100%' />

        <Space spacing={0.5} alignItems='center'>
          <Skeleton.Typography variant='body2' width={150} />

          <Skeleton.Circle preset='icon' size='small' />
        </Space>
      </ClassInfoContainer>
    </Space>
  );
};

export default React.memo(ClassSkeleton);
