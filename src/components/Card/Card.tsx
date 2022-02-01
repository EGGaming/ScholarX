import { CardBaseButtonContainer, CardButtonBase, CardContainer } from '@components/Card/Card.base';
import { CardProps } from '@components/Card/Card.types';
import React from 'react';

const Card: React.FC<CardProps> = (props) => {
  const { onPress, width } = props;
  if (onPress)
    return (
      <CardBaseButtonContainer width={width}>
        <CardButtonBase onPress={onPress}>
          <CardContainer {...props} />
        </CardButtonBase>
      </CardBaseButtonContainer>
    );
  return (
    <CardBaseButtonContainer width={width}>
      <CardContainer {...props} />
    </CardBaseButtonContainer>
  );
};

export default Card;
