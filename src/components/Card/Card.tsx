import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import { CardBaseButtonContainer, CardButtonBase, CardContainer } from '@components/Card/Card.base';
import { CardProps } from '@components/Card/Card.types';
import React from 'react';

const Card: React.FC<CardProps> = (props) => {
  const { onPress, width, height, style } = props;
  if (onPress)
    return (
      <CardBaseButtonContainer width={width} height={height} style={style}>
        <NativeButtonBase round onPress={onPress}>
          <CardContainer {...props} />
        </NativeButtonBase>
      </CardBaseButtonContainer>
    );
  return (
    <CardBaseButtonContainer width={width} height={height} style={style}>
      <CardContainer {...props} />
    </CardBaseButtonContainer>
  );
};

export default Card;
