import SchoolDistrictItem from '@shared/SchoolDistricts/SchoolDistrictItem/SchoolDistrictItem';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { SchoolDistrict } from 'studentvue/StudentVue/StudentVue.interfaces';

export const RenderSchoolDistrictItem: ListRenderItem<SchoolDistrict> = (props) => {
  return <SchoolDistrictItem item={props.item} index={props.index} />;
};
