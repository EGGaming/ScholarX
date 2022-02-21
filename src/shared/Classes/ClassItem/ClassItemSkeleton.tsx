import Flex from '@components/Flex/Flex';
import ListItem from '@components/List/ListItem';
import Skeleton from '@components/Skeleton/Skeleton';
import Typography from '@components/Typography/Typography';
import React from 'react';

const ClassItemSkeleton: React.FC = (props) => {
  const {} = props;
  return (
    <ListItem>
      <Flex direction='column'>
        <Skeleton.Typography width={200} />
        <Skeleton.Typography variant='caption' width={100} />

        <Skeleton.Typography variant='caption' width={60} />
      </Flex>
    </ListItem>
  );
};

export default React.memo(ClassItemSkeleton);
