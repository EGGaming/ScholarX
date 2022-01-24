import React from 'react';

export type Reducer<S, A> = (state: S, action: A) => S;

export type UseReducer<S, A> = [state: S, dispatch: React.Dispatch<A>];

export type UseState<S> = [state: S, setState: React.Dispatch<React.SetStateAction<S>>];

export type Initializer<S> = { type: 'INITIALIZE'; state: S };
