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

import { SchoolDistrictItemProps } from '@shared/SchoolDistricts/SchoolDistrictItem/SchoolDistrictItem.types';
import React from 'react';

const SchoolDistrictItem: React.FC<SchoolDistrictItemProps> = (props) => {
  const navigation = useNavigation<NavigationProp<LoginStackParamList>>();
  const { item, index } = props;
  const dispatch = useAppDispatch();

  function handleOnPress() {
    dispatch({ type: 'SET_DISTRICT', district: item.name, url: item.parentVueUrl });
    navigation.navigate('SignIn');
  }
  return (
    <ListItem onPress={handleOnPress} icon={<Button title='Select' size='small' onPress={handleOnPress} />}>
      <Flex direction='column'>
        <Typography variant='body2' color='textSecondary'>
          {item.address}
        </Typography>
        <Typography bold>{item.name}</Typography>
      </Flex>
    </ListItem>
  );
};
export default React.memo(SchoolDistrictItem);
