import Icon from '@components/Icon/Icon';
import TextField from '@components/TextField/TextField';
import { SchoolDistrictsHeaderBaseContainer } from '@shared/SchoolDistricts/SchoolDistrictsHeader/SchoolDistrictsHeader.base';
import { SchoolDistrictsHeaderProps } from '@shared/SchoolDistricts/SchoolDistrictsHeader/SchoolDistrictsHeader.types';
import React from 'react';

const SchoolDistrictsHeader: React.FC<SchoolDistrictsHeaderProps> = ({ query, setQuery }) => {
  return (
    <SchoolDistrictsHeaderBaseContainer>
      <TextField
        value={query}
        onChangeText={setQuery}
        width='100%'
        placeholder='District Name'
        adornmentStart={<Icon bundle='AntDesign' name='search1' />}
      />
    </SchoolDistrictsHeaderBaseContainer>
  );
};

export default React.memo(SchoolDistrictsHeader);
