import { AppStorageInterface, useSyncEffectOptions } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import useComponentMounted from '@utilities/useComponentMounted';
import { Initializer } from '@context/helpers';
import StoredReducer from './StoredReducer';
import {
  StorageContext,
  StorageDispatchContext,
  StorageReducer,
  useStorage,
  useStorageDispatch,
} from './context/StorageContext';
import { useAppReducer } from '@context/AppContext/AppContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { useSessionDispatch } from '@context/SessionContext/SessionContext';

class Storage<T extends AppStorageInterface> {
  get<K extends keyof T>(key: K): Promise<T[K]> {
    return new Promise(async (res, rej) => {
      try {
        const json = await AsyncStorage.getItem(String(key));
        if (!json) return rej(`Key ${key} does not exist`);
        res(JSON.parse(json));
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  set<K extends keyof T>(key: K, value: T[K]): Promise<void> {
    return new Promise(async (res) => {
      try {
        await AsyncStorage.setItem(String(key), JSON.stringify(value));
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  reset(): Promise<void> {
    return new Promise((res) => {});
  }

  keys(): Promise<string[]> {
    return new Promise(async (res) => {
      try {
        const stored = await AsyncStorage.getAllKeys();
        res(stored);
      } catch (e) {
        throw Error(e as any);
      }
    });
  }

  useSyncEffect<K extends keyof T>(
    key: K,
    obj: T[K],
    initializer: React.Dispatch<Initializer<T[K]>>,
    options: useSyncEffectOptions = {}
  ): void {
    // const { additionalConditions = () => true, customDependencies = [] } = options;
    // const isMounted = useComponentMounted();
    // const dispatch = useStorageDispatch();
    // const dependencies = React.useMemo(() => {
    //   return [obj, ...customDependencies];
    // }, [obj, customDependencies]);
    // React.useEffect(() => {
    //   dispatch({ type: 'INCREMENT' });
    //   (async () => {
    //     const stored = await this.get(key);
    //     if (stored != null) initializer({ type: 'INITIALIZE', state: stored });
    //     else console.error(`Key ${key} does not exist in storage`);
    //   })();
    // }, []);
    // React.useEffect(() => {
    //   if (isMounted && additionalConditions()) {
    //     console.log(`Updating ${key}`);
    //     this.set(key, obj);
    //   }
    // }, dependencies);
  }

  initialize(): boolean {
    return true;
    // const [ready, setReady] = React.useState(false);
    // const [_] = useStudentVue();
    // const [state] = useStorage();
    // React.useEffect(() => {
    //   const interval = setInterval(() => {
    //     (async () => {
    //       const numberOfKeys: number = await this.get('__storedKeysCount' as any);
    //       if (numberOfKeys == state) {
    //         setReady(true);
    //         clearInterval(interval);
    //       }
    //     })();
    //   }, 1);
    //   return () => {
    //     clearInterval(interval);
    //   };
    // }, [state]);

    // return ready;
  }

  public Provider: React.FC = ({ children }) => {
    const [state, dispatch] = StorageReducer();
    const isMounted = useComponentMounted();

    React.useEffect(() => {
      (async () => {
        if (isMounted) {
          await this.set('__storedKeysCount' as any, state);
        }
      })();
    }, [state]);

    return (
      <StorageContext.Provider value={[state, dispatch]}>
        <StorageDispatchContext.Provider value={dispatch}>{children}</StorageDispatchContext.Provider>
      </StorageContext.Provider>
    );
  };
}

export default new Storage<AppStorageInterface>();
