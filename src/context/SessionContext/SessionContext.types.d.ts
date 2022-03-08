import { Initializer } from '@context/helpers';
import { StudentInfo } from '@utilities/StudentVue/types';

export type SessionContextState = { loggedIn: boolean };

export type SessionContextActions = { type: 'LOGIN' } | { type: 'LOGOUT' } | { type: 'TOGGLE_STAYED_SIGN_IN' };
