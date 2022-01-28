import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import TextField from '@components/TextField/TextField';
import React from 'react';
import { TextInput } from 'react-native';
import { SearchContainer, SearchField } from './Search.base';
import { SearchProps } from './Search.types';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import useComponentMounted from '@utilities/useComponentMounted';

const Search: React.FC<SearchProps> = (props) => {
  const { search, setSearch, setFocused, focused } = props;

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
          adornmentStart={<Icon bundle='Feather' name='search' />}
          width='90%'
          placeholder='School name'
        />
      )}
    </SearchContainer>
  );
};

export default React.memo(Search);
