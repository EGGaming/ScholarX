import Button from '@components/Button/Button';
import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Floating from '@components/Floating/Floating';
import FloatingButton from '@components/Floating/FloatingButton/FloatingButton';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Illustration from '@components/Illustration/Illustration';
import Loader from '@components/Loader/Loader';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useSearch } from '@context/SearchDistrictContext/SearchDistrictContext';
import { useSearchFocused } from '@context/SearchDistrictFocusedContext/SearchDistrictFocusedContext';
import { LoginStackParamList } from '@navigators/Login/Login.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackHeaderProps } from '@react-navigation/stack';
import Search from '@screens/Login/components/Search/Search';
import {
  DistrictErrorContainer,
  DistrictErrorImage,
  DistrictNotFoundImage,
} from '@screens/Login/DistrictList/DistrictList.base';
import useDistrictListReducer from '@screens/Login/DistrictList/reducer/DistrictListReducer';
import Header from '@shared/@react-navigation/Header';
import { RenderSchoolDistrictItem } from '@shared/SchoolDistricts/SchoolDistricts.utils';
import { useAppTheme } from '@theme/core';
// import StudentVue from '@utilities/StudentVue';
import StudentVue from 'studentvue';
import { KeyExtractor } from '@utilities/TypeUtilities';
import React from 'react';
import { FlatList, Animated } from 'react-native';
import { useCollapsibleHeader, UseCollapsibleOptions } from 'react-navigation-collapsible';
import { SchoolDistrict } from 'studentvue/StudentVue/StudentVue.interfaces';
const keyExtractor: KeyExtractor<SchoolDistrict> = (item) => item.parentVueUrl;

const stickyHeaderHeight = 60;
const DistrictList: React.FC<NativeStackScreenProps<LoginStackParamList, 'DistrictList'>> = ({
  route: {
    params: { zipCode },
  },
}) => {
  const [search, setSearch] = useSearch();
  const [focused, setFocused] = useSearchFocused();
  const [districts, setDistricts] = React.useState<SchoolDistrict[]>([]);
  const [state, dispatch] = useDistrictListReducer();
  const theme = useAppTheme();
  const options: UseCollapsibleOptions = {
    navigationOptions: {
      header: (props: JSX.IntrinsicAttributes & StackHeaderProps) => <Header {...props} />,
      headerTitle: 'School Districts',
      // headerTitle: React.useCallback(() => <Search />, []),
      // headerRight: () => (
      //   <>
      //     {!focused && !search && (
      //       <IconButton
      //         icon={<Icon bundle='Feather' name='search' />}
      //         onPress={() => {
      //           setFocused(true);
      //         }}
      //       />
      //     )}
      //   </>
      // ),
    },
    config: {
      useNativeDriver: true,
      collapsedColor: theme.palette.background.default,
      elevation: 4,
    },
  };

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY } = useCollapsibleHeader(options);

  const fetchDistrictsFromAPI = React.useCallback(() => {
    if (!state.loading) dispatch({ type: 'RESET_STATE' });
    StudentVue.findDistricts(zipCode)
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
    return districts.filter((district) => district.name.toLowerCase().includes(search.toLowerCase().trim()));
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
    <>
      <Animated.FlatList
        data={filtered}
        onScroll={onScroll}
        contentContainerStyle={{
          backgroundColor: theme.palette.background.default,
          paddingTop: containerPaddingTop + stickyHeaderHeight,
        }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop + stickyHeaderHeight }}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <Container>
            <Typography bold align='center'>
              Select a school district below
            </Typography>
            <Typography align='center' variant='body2' color='textSecondary'>
              Tap on a school district to be redirected to its login screen
            </Typography>
          </Container>
        }
        renderItem={RenderSchoolDistrictItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          state.loading ? (
            <Loader size='large' />
          ) : (
            <DistrictErrorContainer>
              {!focused && <Illustration type='not-found' />}
              <Typography variant='h1' align='center' bold>
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
      <Animated.View
        style={{
          height: stickyHeaderHeight,
          top: containerPaddingTop,
          transform: [{ translateY }],
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'flex-end',
        }}>
        <Search />
      </Animated.View>
    </>
  );
};

export default DistrictList;
