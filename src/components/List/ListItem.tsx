import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import { ListItemContainer } from '@components/List/ListItem.base';
import { ListItemProps } from '@components/List/ListItem.types';
import useComponentMounted from '@utilities/useComponentMounted';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, concat, withTiming } from 'react-native-reanimated';

const ListItem: React.FC<ListItemProps> = ({ children, onPress, expandContent, icon }) => {
  const rotation = useSharedValue(0);
  const expandedContentTranslationY = useSharedValue(-10);
  const baseOpacity = useSharedValue(0);
  const baseTranslationY = useSharedValue(-10);
  const expandedContentOpacity = useSharedValue(0);
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const slideIn = useAnimatedStyle(() => ({
    transform: [{ translateY: expandedContentTranslationY.value }],
    opacity: expandedContentOpacity.value,
  }));
  const baseStyle = useAnimatedStyle(() => ({
    opacity: baseOpacity.value,
    transform: [{ translateY: baseTranslationY.value }],
  }));
  const isMounted = useComponentMounted();
  const [expand, toggle] = React.useReducer((s) => !s, false);
  const handleOnPress = React.useCallback(() => {
    toggle();
  }, [toggle]);

  React.useEffect(() => {
    baseOpacity.value = withSpring(1);
    baseTranslationY.value = withTiming(0, { duration: 300 });
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      if (expand) {
        rotation.value = withTiming(180, { duration: 100 });
        expandedContentTranslationY.value = withSpring(0);
        expandedContentOpacity.value = withTiming(1, { duration: 50 });
      } else {
        rotation.value = withTiming(0, { duration: 100 });
        expandedContentTranslationY.value = withTiming(-10, { duration: 100 });
        expandedContentOpacity.value = withTiming(0, { duration: 50 });
      }
    }
  }, [expand]);

  if (onPress || expandContent)
    return (
      <NativeButtonBase onPress={expandContent ? handleOnPress : onPress}>
        <ListItemContainer style={baseStyle}>
          <Flex direction='row' alignItems='center'>
            <Flex shrink>{children}</Flex>
            {expandContent && (
              <Flex grow justifyContent='flex-end'>
                <Animated.View style={rotationStyle}>
                  <Icon bundle='Feather' name='chevron-down' color='disabled' />
                </Animated.View>
              </Flex>
            )}
            {icon && (
              <Flex grow justifyContent='flex-end'>
                {icon}
              </Flex>
            )}
          </Flex>
          {expand && <Animated.View style={slideIn}>{expandContent}</Animated.View>}
        </ListItemContainer>
      </NativeButtonBase>
    );

  return (
    <ListItemContainer style={baseStyle}>
      <Flex direction='row' alignItems='center'>
        <Flex shrink>{children}</Flex>
        {expandContent && (
          <Flex grow justifyContent='flex-end'>
            <Animated.View style={rotationStyle}>
              <Icon bundle='Feather' name='chevron-down' color='disabled' />
            </Animated.View>
          </Flex>
        )}
        {icon && (
          <Flex grow justifyContent='flex-end'>
            {icon}
          </Flex>
        )}
      </Flex>
      {expand && <Animated.View style={slideIn}>{expandContent}</Animated.View>}
    </ListItemContainer>
  );
};

export default ListItem;
