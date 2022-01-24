import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import Events from '@shared/Events/Events';
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Events />
    </Container>
  );
};

const Container = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

export default Dashboard;
