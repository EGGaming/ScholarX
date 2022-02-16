import Button from '@components/Button/Button';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useSessionReducer } from '@context/SessionContext/SessionContext';
import Classes from '@shared/Classes/Classes';
import Events from '@shared/Events/Events';
import Schedule from '@shared/Schedule/Schedule';
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Dashboard: React.FC = () => {
  const [session] = useSessionReducer();

  return (
    <Container>
      {session.validSession && (
        <Flex container direction='column'>
          <Space spacing={0.5} alignItems='center'>
            <Typography color='textSecondary'>Hello, {session.nickname ? session.nickname : session.name}</Typography>
            <Typography>👋</Typography>
          </Space>
          <Typography variant='h2' bold>
            Welcome back
          </Typography>
        </Flex>
      )}
      <Space spacing={2} direction='vertical'>
        <Schedule />
        <Classes />
        <Events />
      </Space>
    </Container>
  );
};

const Container = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

export default Dashboard;
