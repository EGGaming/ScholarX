import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { HeaderContainer } from '@shared/@react-navigation/Header/Header.shared';
import React from 'react';

const NotificationHeader: React.FC<NativeStackHeaderProps> = (props) => {
  const {
    options: { headerBackVisible = true, headerTitle = props.route.name },
    options,
  } = props;

  function onBackButtonPressed() {
    props.navigation.goBack();
  }

  const HeaderTitle = headerTitle;

  return (
    <HeaderContainer>
      <Space spacing={1} alignItems='center' justifyContent='space-between' shrink>
        {headerBackVisible && (
          <IconButton icon={<Icon bundle='AntDesign' name='back' />} onPress={onBackButtonPressed} />
        )}
        <Flex shrink>
          {typeof headerTitle === 'string' ? (
            <Typography bold numberOfLines={1}>
              {headerTitle}
            </Typography>
          ) : (
            <HeaderTitle {...(props as any)} />
          )}
        </Flex>
      </Space>
      {options.headerRight && options.headerRight({ tintColor: options.headerTintColor })}
    </HeaderContainer>
  );
};

export default React.memo(NotificationHeader);
