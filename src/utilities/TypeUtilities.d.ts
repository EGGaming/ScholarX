import { ListRenderItemInfo } from 'react-native';

export type RequireAll<T> = {
  [K in keyof T]-?: T[K] extends Record<string, unknown> ? RequireAll<T[K]> : T[K];
};

export type KeyExtractor<T> = ((item: T, index: number) => string) | undefined;

export type RenderItemProps<T> = ListRenderItemInfo<T>;
