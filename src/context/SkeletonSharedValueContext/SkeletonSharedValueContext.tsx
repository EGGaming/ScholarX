import { SharedValue } from '@context/SkeletonSharedValueContext/SkeletonSharedValueContext.types';
import React from 'react';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const SkeletonSharedValueContext = React.createContext<SharedValue>({} as any);

export const useSkeletonSharedValue = () => React.useContext(SkeletonSharedValueContext);

const SkeletonSharedValueProvider: React.FC = ({ children }) => {
  const opacity = useSharedValue(0.4);

  return <SkeletonSharedValueContext.Provider value={opacity}>{children}</SkeletonSharedValueContext.Provider>;
};

export default SkeletonSharedValueProvider;
