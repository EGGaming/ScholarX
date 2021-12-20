import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import Typography from '@components/Typography/Typography';
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Typography color='textSecondary'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequuntur recusandae sed repellat et,
        voluptatem, molestiae est in iusto vero facere fugiat eos alias. Ad placeat quas inventore optio dolore.
      </Typography>
      <Icon bundle='FontAwesome5' name='500px' />
      <Button
        title='Text Button'
        onPress={() => {
          console.log('Clicked');
        }}
        icon={<Icon bundle='Foundation' name='shopping-bag' />}
        color='primary'
      />
      <Button
        title='Contained Button'
        onPress={() => {}}
        color='primary'
        variant='contained'
        icon={<Icon bundle='Foundation' name='shopping-bag' />}
      />
      <Button
        title='Outlined Button'
        onPress={() => {}}
        color='primary'
        variant='outlined'
        icon={<Icon bundle='Foundation' name='shopping-bag' />}
      />
      <Button
        title='Text Button'
        onPress={() => {}}
        icon={<Icon bundle='Foundation' name='shopping-bag' />}
        color='secondary'
      />
      <Button
        title='Contained Button'
        onPress={() => {}}
        color='secondary'
        variant='contained'
        icon={<Icon bundle='Foundation' name='shopping-bag' />}
      />
      <Button
        title='Outlined Button'
        onPress={() => {}}
        color='secondary'
        variant='outlined'
        icon={<Icon bundle='Foundation' name='shopping-bag' />}
      />
    </Container>
  );
};

const Container = styled.ScrollView`
  padding: ${(props) => props.theme.spacing(3)};
  display: flex;
  flex-direction: column;
`;

export default Dashboard;
