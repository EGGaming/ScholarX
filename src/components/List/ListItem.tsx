import { ButtonBase } from '@components/Button/Button.base';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import { ListItemContainer } from '@components/List/ListItem.base';
import { ListItemProps } from '@components/List/ListItem.types';
import useComponentMounted from '@utilities/useComponentMounted';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, concat, withTiming } from 'react-native-reanimated';

const ListItem: React.FC<ListItemProps> = ({ children, onPress, expandContent }) => {
  const rotation = useSharedValue(0);
  const translationY = useSharedValue(-10);
  const opacity = useSharedValue(0);
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const slideIn = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value }],
    opacity: opacity.value,
  }));
  const isMounted = useComponentMounted();
  const [expand, toggle] = React.useReducer((s) => !s, false);
  const handleOnPress = React.useCallback(() => {
    toggle();
  }, [toggle]);

  React.useEffect(() => {
    if (isMounted) {
      if (expand) {
        rotation.value = withTiming(180, { duration: 100 });
        translationY.value = withSpring(0);
        opacity.value = withTiming(1, { duration: 250 });
      } else {
        rotation.value = withTiming(0, { duration: 100 });
        translationY.value = withSpring(-10);
        opacity.value = withTiming(0, { duration: 250 });
      }
    }
  }, [expand]);

  return (
    <ButtonBase onPress={expandContent ? handleOnPress : onPress}>
      <ListItemContainer>
        <Flex direction='row' alignItems='center'>
          <Flex grow>{children}</Flex>
          {expandContent && (
            <Flex shrink>
              <Animated.View style={rotationStyle}>
                <Icon bundle='Feather' name='chevron-down' color='disabled' />
              </Animated.View>
            </Flex>
          )}
        </Flex>
        {expand && <Animated.View style={slideIn}>{expandContent}</Animated.View>}
      </ListItemContainer>
    </ButtonBase>
  );
};

export default ListItem;
