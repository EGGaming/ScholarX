import { ScrollViewContainer, ViewContainer } from '@components/Container/Container.base';
import { ContainerProps } from '@components/Container/Container.types';
import React from 'react';

const Container: React.FC<ContainerProps> = (props) => {
  const { scrollable, header = false } = props;
  if (scrollable)
    return (
      <ScrollViewContainer header scrollable={true}>
        {props.children}
      </ScrollViewContainer>
    );
  return (
    <ViewContainer header scrollable={false}>
      {props.children}
    </ViewContainer>
  );
};
export default Container;
