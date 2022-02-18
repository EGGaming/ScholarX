import { StudentClass } from '@utilities/StudentVue/types';
import React from 'react';

export interface AssignmentFilterContextState {
  currentlyViewingClass: string;
  assignmentCategories: string[];
  filters: Record<string, AssignmentFilterOfClassContextState>;
}

export interface AssignmentFilterOfClassContextState {
  withDropbox: boolean;
  orderType: Order;
  selectedAssignments: string[];
}

export type AssignmentFilterContextFields = {
  [K in keyof AssignmentFilterOfClassContextState]: React.Context<AssignmentFilterOfClassContextState[K]>;
};

export enum Order {
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending',
}

export type AssignmentFilterContextActions =
  | {
      type: 'ADD_FILTER';
      key: keyof AssignmentFilterOfClassContextState;
      value: any;
    }
  | { type: 'INITIALIZE_CLASS_FILTER'; className: string }
  | { type: 'IS_VIEWING_CLASS'; class: StudentClass }
  | { type: 'RESET_FILTERS' }
  | { type: 'APPEND_ASSIGNMENT_TYPE'; assignmentType: string }
  | { type: 'REMOVE_ASSIGNMENT_TYPE'; assignmentType: string }
  | { type: 'APPEND_OR_REMOVE_ASSIGNMENT_TYPE'; assignmentType: string }
  | { type: 'DESELECT_ALL_ASSIGNMENT_TYPES' };
