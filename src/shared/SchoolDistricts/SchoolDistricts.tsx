import { SchoolDistrictsProps } from '@shared/SchoolDistricts/SchoolDistricts.types';
import { RenderSchoolDistrictItem } from '@shared/SchoolDistricts/SchoolDistricts.utils';
import SchoolDistrictsHeader from '@shared/SchoolDistricts/SchoolDistrictsHeader/SchoolDistrictsHeader';
import { useAppTheme } from '@theme/core';
import { DistrictInfo } from '@utilities/StudentVue/types';
import { KeyExtractor } from '@utilities/TypeUtilities';
import React from 'react';
import { Dimensions, FlatList } from 'react-native';

const keyExtractor: KeyExtractor<DistrictInfo> = (item) => item.PvueURL;

const SchoolDistricts: React.FC<SchoolDistrictsProps> = ({ districts }) => {
  const [query, setQuery] = React.useState<string>('');
  const filtered = React.useMemo(() => {
    if (query.length === 0) return districts;
    return districts.filter((district) => district.Name.toLowerCase().match(query.toLowerCase()));
  }, [districts, query]);
  return <FlatList data={filtered} keyExtractor={keyExtractor} renderItem={RenderSchoolDistrictItem} />;
};

export default React.memo(SchoolDistricts);
