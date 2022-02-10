import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import { GradeSymbolContainer, ClassInfoContainer, ClassContainer } from '@shared/Classes/Class/Class.base';
import React from 'react';

const ClassSkeleton: React.FC = () => {
  return (
    <ClassContainer>
      <Space spacing={1}>
        <GradeSymbolContainer>
          <Space spacing={0.5} direction='vertical'>
            <Skeleton.Typography variant='h1' width={40} align='center' />
            <Skeleton.Typography variant='body2' width={60} align='center' />
          </Space>
        </GradeSymbolContainer>
        <ClassInfoContainer>
          <Space spacing={0.3} direction='vertical'>
            <Skeleton.Typography width='100%' />

            <Space spacing={0.5} alignItems='center'>
              <Skeleton.Typography variant='body2' width={150} />

              <Skeleton.Circle preset='icon' size='medium' />
            </Space>
          </Space>
        </ClassInfoContainer>
      </Space>
    </ClassContainer>
  );
};

export default React.memo(ClassSkeleton);
