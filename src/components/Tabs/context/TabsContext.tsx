import { UseState } from '@context/helpers';
import React from 'react';

export const TabsContext = React.createContext<UseState<number>>({} as any);

export const useTabsContext = () => React.useContext(TabsContext);
