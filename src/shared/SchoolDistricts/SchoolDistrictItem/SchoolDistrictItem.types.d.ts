import { DistrictInfo } from '@utilities/StudentVue/types';
import { RenderItemProps } from '@utilities/TypeUtilities';
import { ListRenderItem } from 'react-native';
import { SchoolDistrict } from 'studentvue/StudentVue/StudentVue.interfaces';

export type SchoolDistrictItemProps = {
  item: SchoolDistrict;
  index: number;
};
