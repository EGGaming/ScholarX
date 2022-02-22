import { SharedValue } from '@context/SkeletonSharedValueContext/SkeletonSharedValueContext.types';
import React from 'react';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const SkeletonSharedValueContext = React.createContext<SharedValue>({} as any);

export const useSkeletonSharedValue = () => React.useContext(SkeletonSharedValueContext);

const SkeletonSharedValueProvider: React.FC = ({ children }) => {
  // const opacity = useSharedValue(0.2);

  // React.useEffect(() => {
  //   opacity.value = withRepeat(withTiming(0.4, { duration: 1000, easing: Easing.exp }), -1, true);
  // }, []);

  return <SkeletonSharedValueContext.Provider value={{ value: 0.2 }}>{children}</SkeletonSharedValueContext.Provider>;
};

export default SkeletonSharedValueProvider;
