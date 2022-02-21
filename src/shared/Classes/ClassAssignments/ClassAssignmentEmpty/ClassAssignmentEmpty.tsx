import Flex from '@components/Flex/Flex';
import Illustration from '@components/Illustration/Illustration';
import Typography from '@components/Typography/Typography';
import React from 'react';

const ClassAssignmentEmpty: React.FC = (props) => {
  const {} = props;
  return (
    <Flex direction='column' container>
      <Typography variant='h3' align='center'>
        No assignments found
      </Typography>
      <Illustration type='no-assignments' />
    </Flex>
  );
};

export default ClassAssignmentEmpty;
