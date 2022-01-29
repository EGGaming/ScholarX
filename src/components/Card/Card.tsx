import { CardBaseButtonContainer, CardButtonBase, CardContainer } from '@components/Card/Card.base';
import { CardProps } from '@components/Card/Card.types';
import React from 'react';

const Card: React.FC<CardProps> = (props) => {
  const { onPress } = props;
  if (onPress)
    return (
      <CardBaseButtonContainer>
        <CardButtonBase onPress={onPress}>
          <CardContainer {...props} />
        </CardButtonBase>
      </CardBaseButtonContainer>
    );
  return (
    <CardBaseButtonContainer>
      <CardContainer {...props} />
    </CardBaseButtonContainer>
  );
};

export default Card;
