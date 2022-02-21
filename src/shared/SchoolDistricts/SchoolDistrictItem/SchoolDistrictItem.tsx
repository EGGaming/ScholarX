import Button from '@components/Button/Button';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import ListItem from '@components/List/ListItem';
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

  function handleOnPress() {
    dispatch({ type: 'SET_DISTRICT', district: item.Name, url: item.PvueURL });
    navigation.navigate('SignIn');
  }
  return (
    <ListItem onPress={handleOnPress} icon={<Button title='Select' size='small' onPress={handleOnPress} />}>
      <Flex direction='column'>
        <Typography variant='body2' color='textSecondary'>
          {item.Address}
        </Typography>
        <Typography bold>{item.Name}</Typography>
      </Flex>
    </ListItem>
  );
};
export default React.memo(SchoolDistrictItem);
