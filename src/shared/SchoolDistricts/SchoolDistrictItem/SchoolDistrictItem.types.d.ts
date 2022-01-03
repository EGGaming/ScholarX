import { DistrictInfo } from '@utilities/StudentVue/types';
import { RenderItemProps } from '@utilities/TypeUtilities';
import { ListRenderItem } from 'react-native';

export type SchoolDistrictItemProps = {
  item: DistrictInfo;
  index: number;
};
