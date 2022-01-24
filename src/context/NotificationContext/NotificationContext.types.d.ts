import { Initializer } from '@context/helpers';
import { Message } from '@utilities/StudentVue/types';

export interface NotificationContextState {
  unreadNotifications: Message[];
  notifications: Message[];
}

export type NotificationContextActions =
  | { type: 'FETCH_NOTIFICATIONS'; messages: Message[] }
  | { type: 'MARK_AS_READ'; message: Message }
  | Initializer<NotificationContextState>;
