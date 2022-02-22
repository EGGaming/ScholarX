import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import {
  CardBaseButtonContainer,
  CardBaseButtonContainerNoAnimation,
  CardButtonBase,
  CardContainer,
} from '@components/Card/Card.base';
import { CardProps } from '@components/Card/Card.types';
import useCardAnimation from '@utilities/useCardAnimation';
import React from 'react';
import { InteractionManager } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const Card: React.FC<CardProps> = (props) => {
  const { onPress, width, height, disableAnimation } = props;
  if (disableAnimation)
    return (
      <CardBaseButtonContainerNoAnimation>
        <CardContainer {...props} />
      </CardBaseButtonContainerNoAnimation>
    );
  const style = useCardAnimation();

  if (onPress)
    return (
      <CardBaseButtonContainer width={width} height={height} style={style} disableAnimation={disableAnimation}>
        <NativeButtonBase round onPress={onPress}>
          <CardContainer {...props} />
        </NativeButtonBase>
      </CardBaseButtonContainer>
    );
  return (
    <CardBaseButtonContainer width={width} height={height} style={style} disableAnimation={disableAnimation}>
      <CardContainer {...props} />
    </CardBaseButtonContainer>
  );
};

export default Card;
