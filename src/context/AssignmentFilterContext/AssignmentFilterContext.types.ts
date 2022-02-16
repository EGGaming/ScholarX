import { StudentClassAssignment } from '@utilities/StudentVue/types';
import { Paths } from '@utilities/TypeUtilities';

type AddFilterProperties<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? AddFilterProperties<T[K]>
    : T[K] extends boolean
    ? boolean
    : Array<T[K]>;
};

export interface AssignmentFilterContextState {
  withDropbox: boolean;
}

export enum FieldVisibility {
  INCLUDE = 'Include',
  VISIBLE = 'Show All',
}

export type AssignmentFilterContextActions = {
  type: 'ADD_FILTER';
  key: keyof AssignmentFilterContextState;
  value: any;
};
