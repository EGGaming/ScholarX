import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import Loader from '@components/Loader/Loader';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useSearch } from '@context/SearchDistrictContext/SearchDistrictContext';
import { useSearchFocused } from '@context/SearchDistrictFocusedContext/SearchDistrictFocusedContext';
import { LoginStackParamList } from '@navigators/Login/Login.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  DistrictErrorContainer,
  DistrictErrorImage,
  DistrictNotFoundImage,
} from '@screens/Login/DistrictList/DistrictList.base';
import useDistrictListReducer from '@screens/Login/DistrictList/reducer/DistrictListReducer';
import { RenderSchoolDistrictItem } from '@shared/SchoolDistricts/SchoolDistricts.utils';
import StudentVue from '@utilities/StudentVue';
import { DistrictInfo } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
const keyExtractor: KeyExtractor<DistrictInfo> = (item) => item.PvueURL;

const DistrictList: React.FC<NativeStackScreenProps<LoginStackParamList, 'DistrictList'>> = ({
  route: {
    params: { zipCode },
  },
}) => {
  const [search, setSearch] = useSearch();
  const [focused] = useSearchFocused();
  const [districts, setDistricts] = React.useState<DistrictInfo[]>([]);
  const [state, dispatch] = useDistrictListReducer();

  const fetchDistrictsFromAPI = React.useCallback(() => {
    if (!state.loading) dispatch({ type: 'RESET_STATE' });
    StudentVue.districts(zipCode)
      .then(setDistricts)
      .catch((err) => dispatch({ type: 'ERROR', error: err }))
      .finally(() => dispatch({ type: 'STOP_LOADING' }));
  }, [dispatch, setDistricts, state.loading]);

  React.useEffect(() => {
    fetchDistrictsFromAPI();
    return () => {
      setSearch('');
    };
  }, []);

  const filtered = React.useMemo(() => {
    if (search.length === 0) return districts;
    return districts.filter((district) => district.Name.toLowerCase().match(search.toLowerCase()));
  }, [districts, search]);

  if (state.error)
    return (
      <DistrictErrorContainer>
        <Space spacing={4} direction='vertical' justifyContent='center' alignItems='center'>
          <>
            <DistrictErrorImage />
            <Typography variant='h1' bold>
              Oh no!
            </Typography>
            <Typography color='textSecondary' align='center'>
              {state.error}
            </Typography>
          </>
          <Button
            title='Reload'
            variant='contained'
            onPress={fetchDistrictsFromAPI}
            icon={<Icon bundle='MaterialCommunityIcons' name='reload' />}
          />
        </Space>
      </DistrictErrorContainer>
    );
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={filtered}
      keyExtractor={keyExtractor}
      renderItem={RenderSchoolDistrictItem}
      ListEmptyComponent={
        state.loading ? (
          <Loader size='large' />
        ) : (
          <DistrictErrorContainer>
            {!focused && <DistrictNotFoundImage />}
            <Typography variant='h1' bold>
              Not found
            </Typography>
            <Typography color='textSecondary' align='center'>
              Did not find districts matching '{search}'
            </Typography>
          </DistrictErrorContainer>
        )
      }
      maxToRenderPerBatch={8}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 64,
  },
});

export default DistrictList;
