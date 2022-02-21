import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Skeleton from '@components/Skeleton/Skeleton';
import Space from '@components/Space/Space';
import { DayButtonContainer } from '@screens/Events/Day/Day.base';
import useCardAnimation from '@utilities/useCardAnimation';
import React from 'react';
import { View } from 'react-native';

const DaySkeleton: React.FC = (props) => {
  const {} = props;
  return (
    <DayButtonContainer selected={false}>
      <Container>
        <Skeleton.Typography width={40} align='center' />
        <Skeleton.Typography width={17} align='center' />
      </Container>
    </DayButtonContainer>
  );
};

export default React.memo(DaySkeleton);
