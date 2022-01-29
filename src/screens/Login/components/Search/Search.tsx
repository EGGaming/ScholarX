import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import TextField from '@components/TextField/TextField';
import React from 'react';
import { TextInput } from 'react-native';
import { SearchContainer, SearchField } from './Search.base';
import { SearchProps } from './Search.types';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import useComponentMounted from '@utilities/useComponentMounted';
import { useSearch } from '@context/SearchDistrictContext/SearchDistrictContext';

const Search: React.FC<SearchProps> = (props) => {
  const { setFocused, focused } = props;
  const [search, setSearch] = useSearch();

  function onBlur() {
    setFocused(false);
  }

  return (
    <SearchContainer>
      {focused && (
        <TextField
          onBlur={onBlur}
          autoFocus
          size='small'
          onChangeText={setSearch}
          adornmentStart={<Icon bundle='Feather' name='search' />}
          width='90%'
          placeholder='School name'
        />
      )}
    </SearchContainer>
  );
};

export default React.memo(Search);
