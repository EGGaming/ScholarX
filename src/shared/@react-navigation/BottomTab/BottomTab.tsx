import Typography from '@components/Typography/Typography';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { IconScreenProps } from '../types';
import { BottomTabContainer, TabBarButtonBase, TabBarButtonContainer } from './BottomTab.shared';

const BottomTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  React.useEffect(() => {
    console.log('Updating');
  }, []);
  return (
    <BottomTabContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index == index;
        const Icon = options.tabBarIcon as React.FC<IconScreenProps>;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true, params: route.params });
          }
        };

        return (
          <TabBarButtonBase onPress={onPress} key={index}>
            <TabBarButtonContainer childrenCount={state.routes.length}>
              <Typography>
                <Icon focused={isFocused} color='' size={0} />
              </Typography>
            </TabBarButtonContainer>
          </TabBarButtonBase>
        );
      })}
    </BottomTabContainer>
  );
};

export default BottomTab;
