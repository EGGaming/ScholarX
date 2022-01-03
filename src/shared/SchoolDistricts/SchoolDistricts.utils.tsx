import SchoolDistrictItem from '@shared/SchoolDistricts/SchoolDistrictItem/SchoolDistrictItem';
import { DistrictInfo } from '@utilities/StudentVue/types';
import React from 'react';
import { ListRenderItem } from 'react-native';

export const RenderSchoolDistrictItem: ListRenderItem<DistrictInfo> = (props) => {
  return <SchoolDistrictItem item={props.item} index={props.index} />;
};
