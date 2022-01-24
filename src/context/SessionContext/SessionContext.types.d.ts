import { Initializer } from '@context/helpers';
import { StudentInfo } from '@utilities/StudentVue/types';

export type SessionContextState =
  | {
      validSession: true;
      name: string;
      nickname: string;
      address: string;
      email: string;
      gender: string;
      grade: string;
      phoneNumber: string;
      id: string;
      photo: string;
    }
  | {
      validSession: false;
    };

export type SessionContextActions =
  | { type: 'LOGIN'; user: StudentInfo['StudentInfo'] }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_STAYED_SIGN_IN' };
