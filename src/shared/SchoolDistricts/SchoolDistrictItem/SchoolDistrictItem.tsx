import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Icon from '@components/Icon/Icon';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppDispatch } from '@context/AppContext/AppContext';
import { SchoolDistrictItemContainer } from '@shared/SchoolDistricts/SchoolDistrictItem/SchoolDistrictItem.base';
import { SchoolDistrictItemProps } from '@shared/SchoolDistricts/SchoolDistrictItem/SchoolDistrictItem.types';
import React from 'react';

const SchoolDistrictItem: React.FC<SchoolDistrictItemProps> = (props) => {
  const { item, index } = props;
  const dispatch = useAppDispatch();

  function handleOnPress() {
    dispatch({ type: 'SET_DISTRICT', district: item.Name, url: item.PvueURL });
  }

  return (
    <SchoolDistrictItemContainer>
      <Card
        headerTitle={
          <Typography bold variant='h3'>
            {item.Name}
          </Typography>
        }
        actions={[<Button title='Select District' onPress={handleOnPress} key='default' color='secondary' />]}>
        <Card.Body>
          <Typography color='textSecondary'>{item.Address}</Typography>
        </Card.Body>
      </Card>
    </SchoolDistrictItemContainer>
  );
};
export default React.memo(SchoolDistrictItem);
