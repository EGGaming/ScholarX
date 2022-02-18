import { StudentClassAssignment } from '@utilities/StudentVue/types';
import { Paths } from '@utilities/TypeUtilities';

export interface AssignmentFilterContextState {
  currentlyViewingClass: string;
  filters: Record<string, AssignmentFilterOfClassContextState>;
}

export interface AssignmentFilterOfClassContextState {
  withDropbox: boolean;
  orderType: Order;
  selectedAssignments: string[];
}

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
  | { type: 'IS_VIEWING_CLASS'; className: string }
  | { type: 'RESET_FILTERS' }
  | { type: 'APPEND_ASSIGNMENT_TYPE'; assignmentType: string }
  | { type: 'REMOVE_ASSIGNMENT_TYPE'; assignmentType: string };
