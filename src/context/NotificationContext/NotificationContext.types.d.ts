import { Message } from '@utilities/StudentVue/types';

export interface NotificationContextState {
  unreadNotifications: Message[];
  notifications: Message[];
}

export type NotificationContextActions = { type: 'FETCH_NOTIFICATIONS'; messages: Message[] };
