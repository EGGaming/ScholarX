export interface AppContextState {
  username: string;
  password: string;
  districtUrl: string;
}

export type AppContextActions =
  | { type: 'SETTER'; key: keyof AppContextState; payload: string }
  | { type: 'CLEAR_CREDENTIALS' };
