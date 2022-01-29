import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import TextField from '@components/TextField/TextField';
import React from 'react';
import { TextInput } from 'react-native';
import { SearchContainer, SearchField } from './Search.base';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import useComponentMounted from '@utilities/useComponentMounted';
import { useSearch } from '@context/SearchDistrictContext/SearchDistrictContext';
import Typography from '@components/Typography/Typography';
import { useSearchFocused } from '@context/SearchDistrictFocusedContext/SearchDistrictFocusedContext';

const Search: React.FC = () => {
  const [search, setSearch] = useSearch();
  const [focused, setFocused] = useSearchFocused();

  function onBlur() {
    setFocused(false);
  }

  function onFocus() {
    setFocused(true);
  }

  return (
    <SearchContainer>
      {focused || search ? (
        <TextField
          onBlur={onBlur}
          autoFocus
          onFocus={onFocus}
          size='small'
          value={search}
          onChangeText={setSearch}
          adornmentStart={<Icon bundle='Feather' name='search' />}
          width='90%'
          placeholder='School district name'
          clearButton
        />
      ) : (
        <Typography bold>Find your school district</Typography>
      )}
    </SearchContainer>
  );
};

export default Search;
