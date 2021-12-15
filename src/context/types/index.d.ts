import React from 'react';

export type Reducer<S, A> = (state: S, action: A) => S;

export type UseReducerProvider<S, A> = [state: S, dispatch: React.Dispatch<A>];
