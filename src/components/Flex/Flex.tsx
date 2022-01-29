import { FlexContainer } from '@components/Flex/Flex.base';
import { FlexProps } from '@components/Flex/Flex.types';
import React from 'react';

const Flex: React.FC<FlexProps> = (props) => {
  const {
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    direction = 'row',
    shrink = false,
    grow = false,
  } = props;
  return (
    <FlexContainer
      justifyContent={justifyContent}
      alignItems={alignItems}
      direction={direction}
      shrink={shrink}
      grow={grow}
      {...props}
    />
  );
};

export default Flex;
