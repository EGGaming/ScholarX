import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import {
  CardBaseButtonContainer,
  CardBaseButtonContainerNoAnimation,
  CardButtonBase,
  CardContainer,
} from '@components/Card/Card.base';
import { CardProps } from '@components/Card/Card.types';
import React from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const Card: React.FC<CardProps> = (props) => {
  const { onPress, width, height, disableAnimation } = props;
  if (disableAnimation)
    return (
      <CardBaseButtonContainerNoAnimation>
        <CardContainer {...props} />
      </CardBaseButtonContainerNoAnimation>
    );
  const opacity = useSharedValue(0);
  const yOffset = useSharedValue(-10);
  React.useEffect(() => {
    opacity.value = withSpring(1);
    yOffset.value = withTiming(0, { duration: 400 });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: yOffset.value }],
  }));
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
