import { useSearch } from '@context/SearchDistrictContext/SearchDistrictContext';
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
  const [search] = useSearch();
  console.log(districts);
  const filtered = React.useMemo(() => {
    if (search.length === 0) return districts;
    return districts.filter((district) => district.Name.toLowerCase().match(search.toLowerCase()));
  }, [districts, search]);
  return <FlatList data={filtered} keyExtractor={keyExtractor} renderItem={RenderSchoolDistrictItem} />;
};

export default React.memo(SchoolDistricts);
