import { Initializer } from '@context/helpers';
import React from 'react';

class StoredReducer<S> {
  private key: string;
  private state: S;
  public dispatch: React.Dispatch<Initializer<S>>;
  constructor(state: S, dispatch: React.Dispatch<Initializer<S>>, key: string) {
    console.log(`StoredReducer created for ${key}`);
    this.state = state;
    this.dispatch = dispatch;
    this.key = key;
  }

  public reducer(): [state: S, dispatch: React.Dispatch<Initializer<S>>] {
    return [this.state, this.dispatch];
  }

  public getKey(): string {
    return this.key;
  }
}

export default StoredReducer;
