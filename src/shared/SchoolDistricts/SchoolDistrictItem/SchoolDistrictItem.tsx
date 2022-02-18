import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppDispatch } from '@context/AppContext/AppContext';
import { LoginStackParamList } from '@navigators/Login/Login.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  SchoolDistrictItemContainer,
  SchoolDistrictItemMetaContainer,
  SchoolDistrictSelectContainer,
} from '@shared/SchoolDistricts/SchoolDistrictItem/SchoolDistrictItem.base';
import { SchoolDistrictItemProps } from '@shared/SchoolDistricts/SchoolDistrictItem/SchoolDistrictItem.types';
import { useAppTheme } from '@theme/core';
import React from 'react';
import Animated, { withSpring, useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

const SchoolDistrictItem: React.FC<SchoolDistrictItemProps> = (props) => {
  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();
  const { item, index } = props;
  const dispatch = useAppDispatch();
  const offset = useSharedValue(900);
  const opacity = useSharedValue(0);
  const theme = useAppTheme();
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: offset.value }],
    paddingVertical: 8,
    paddingHorizontal: 16,
  }));

  React.useEffect(() => {
    offset.value = withTiming(0, { duration: 300, easing: Easing.elastic(0.33) });
    opacity.value = withTiming(1, { duration: 600, easing: Easing.elastic(0.1) });
  }, []);

  function handleOnPress() {
    dispatch({ type: 'SET_DISTRICT', district: item.Name, url: item.PvueURL });
    navigation.navigate('SignIn');
  }

  return (
    <Animated.View style={animatedStyles}>
      <SchoolDistrictItemContainer onPress={handleOnPress}>
        <SchoolDistrictItemMetaContainer>
          <Typography variant='body2' color='textSecondary'>
            {item.Address}
          </Typography>
          <Typography bold>{item.Name}</Typography>
        </SchoolDistrictItemMetaContainer>
      </SchoolDistrictItemContainer>
    </Animated.View>
  );
};
export default React.memo(SchoolDistrictItem);
