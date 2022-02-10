import Flex from '@components/Flex/Flex';
import Illustration from '@components/Illustration/Illustration';
import Typography from '@components/Typography/Typography';
import React from 'react';

const EventEmpty: React.FC = () => (
  <Flex direction='column' container>
    <Illustration type='no-assignments' />
    <Typography align='center' variant='h3' bold>
      There are no events
    </Typography>
  </Flex>
);

export default React.memo(EventEmpty);
