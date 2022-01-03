import { ScrollViewContainer, ViewContainer } from '@components/Container/Container.base';
import { ContainerProps } from '@components/Container/Container.types';
import React from 'react';

const Container: React.FC<ContainerProps> = (props) => {
  const { scrollable } = props;
  if (scrollable) return <ScrollViewContainer scrollable={true}>{props.children}</ScrollViewContainer>;
  return <ViewContainer scrollable={false}>{props.children}</ViewContainer>;
};
export default Container;
