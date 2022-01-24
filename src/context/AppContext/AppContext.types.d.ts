import { Initializer } from '@context/helpers';

export interface AppContextState {
  username: string;
  password: string;
  districtUrl: string;
  districtName: string;
  staySignedIn: boolean;
}

export type AppContextActions =
  | { type: 'SETTER'; key: keyof AppContextState; payload: AppContextState[keyof AppContextState] }
  | { type: 'TOGGLE_STAY_SIGNED_IN' }
  | { type: 'SET_DISTRICT'; district: string; url: string }
  | { type: 'CLEAR_DISTRICT' }
  | { type: 'CLEAR_CREDENTIALS' }
  | Initializer<AppContextState>;
