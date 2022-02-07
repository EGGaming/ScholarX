import Button from '@components/Button/Button';
import { ButtonBase } from '@components/Button/Button.base';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import { TabsContext } from '@components/Tabs/context/TabsContext';
import { TabButtonBaseContainer, TabButtonContainer } from '@components/Tabs/Tabs.base';
import { TabsProps } from '@components/Tabs/Tabs.types';
import Typography from '@components/Typography/Typography';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { View } from 'react-native';

const Tabs: React.FC<TabsProps> = ({ children, options, center = false, container: Container = View }) => {
  const [index, setIndex] = React.useState<number>(0);
  const theme = useAppTheme();
  return (
    <Flex direction='column'>
      <Container>
        <Space spacing={1} justifyContent={center ? 'center' : 'flex-start'}>
          {options.map((title, currentIndex) => (
            <TabButtonBaseContainer key={currentIndex}>
              <ButtonBase round onPress={() => setIndex(currentIndex)} disabled={currentIndex === index}>
                <TabButtonContainer selected={currentIndex === index}>
                  <Typography
                    variant='button'
                    color={currentIndex === index ? 'inherit' : 'textSecondary'}
                    hexColor={theme.palette.getContrastText(theme.palette.primary.main)}>
                    {title}
                  </Typography>
                </TabButtonContainer>
              </ButtonBase>
            </TabButtonBaseContainer>
          ))}
        </Space>
      </Container>
      <TabsContext.Provider value={[index, setIndex]}>
        {React.Children.map(children, (child, currentIndex) =>
          React.isValidElement(child) ? React.cloneElement(child, { index: currentIndex }) : child
        )}
      </TabsContext.Provider>
    </Flex>
  );
};

export default Tabs;
