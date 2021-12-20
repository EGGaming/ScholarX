import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Typography from '@components/Typography/Typography';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '@theme/core';
import React from 'react';
import styled, { css } from 'styled-components/native';

const Header: React.FC<BottomTabHeaderProps> = (props) => {
  return (
    <Container>
      <IconButton icon={<Icon bundle='AntDesign' name='bars' />} onPress={() => {}} />
      <Typography variant='h3' color='textPrimary'>
        {props.options.tabBarLabel}
      </Typography>
      <IconButton icon={<Icon bundle='AntDesign' name='bells' />} onPress={() => {}} />
    </Container>
  );
};

const Container = styled.View`
  ${(props) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${props.theme.spacing(5, 2, 0, 2)};
  `}
`;

export default Header;
