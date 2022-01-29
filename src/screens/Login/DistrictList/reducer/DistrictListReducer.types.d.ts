export interface DistrictListState {
  error: any;
  loading: boolean;
}

export type DistrictListActions =
  | { type: 'START_LOADING' }
  | { type: 'STOP_LOADING' }
  | { type: 'RESET_STATE' }
  | { type: 'ERROR'; error: any };
