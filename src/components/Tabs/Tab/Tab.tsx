import { useTabsContext } from '@components/Tabs/context/TabsContext';
import { TabProps } from '@components/Tabs/Tab/Tab.types';
import React from 'react';

const Tab: React.FC<TabProps> = (props) => {
  const { index: currentIndex, children, onPress = () => void 0 } = props;
  const [index] = useTabsContext();
  React.useEffect(() => {
    if (index === currentIndex) onPress();
  }, [index]);
  if (index === currentIndex) return <>{children}</>;
  return null;
};

export default Tab;
