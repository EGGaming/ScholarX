export interface AppContextState {
  username: string;
  password: string;
  districtUrl: string;
  districtName: string;
}

export type AppContextActions =
  | { type: 'SETTER'; key: keyof AppContextState; payload: string }
  | { type: 'SET_DISTRICT'; district: string; url: string }
  | { type: 'CLEAR_DISTRICT' }
  | { type: 'CLEAR_CREDENTIALS' };
