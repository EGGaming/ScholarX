import { Initializer } from '@context/helpers';
import { Message } from 'studentvue';

export interface NotificationContextState {
  unreadNotifications: Message[];
  notifications: Message[];
}

export type NotificationContextActions =
  | { type: 'FETCH_NOTIFICATIONS'; messages: Message[] }
  | { type: 'MARK_AS_READ'; message: Message }
  | { type: 'MARK_ALL_READ' }
  | Initializer<NotificationContextState>;
