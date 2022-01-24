import { AppContextState } from '@context/AppContext/AppContext.types';
import { NotificationContextState } from '@context/NotificationContext/NotificationContext.types';
import { SessionContextState } from '@context/SessionContext/SessionContext.types';
import { Client } from '@utilities/StudentVue';

export interface AppStorageInterface {
  AppContext: AppContextState;
  NotificationContext: NotificationContextState;
  SessionContext: SessionContextState;
  '@client': Client;
}
