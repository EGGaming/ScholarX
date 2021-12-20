export type RequireAll<T> = {
  [K in keyof T]-?: T[K] extends Record<string, unknown> ? RequireAll<T[K]> : T[K];
};
