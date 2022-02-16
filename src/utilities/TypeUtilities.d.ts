import { ListRenderItemInfo } from 'react-native';
import { StudentClassAssignment } from './StudentVue/types';

export type RequireAll<T> = {
  [K in keyof T]-?: T[K] extends Record<string, unknown> ? RequireAll<T[K]> : T[K];
};

export type KeyExtractor<T> = ((item: T, index: number) => string) | undefined;

export type RenderItemProps<T> = ListRenderItemInfo<T>;

export type Join<K, V> = K extends string | number
  ? V extends string | number
    ? `${K}${'' extends V ? '' : '.'}${V}`
    : never
  : never;

export type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
    }[keyof T]
  : '';
