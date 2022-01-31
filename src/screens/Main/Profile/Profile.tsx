import Avatar from '@components/Avatar/Avatar';
import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import ListItem from '@components/List/ListItem';
import Space from '@components/Space/Space';
import Tab from '@components/Tabs/Tab/Tab';
import Tabs from '@components/Tabs/Tabs';
import Typography from '@components/Typography/Typography';
import { useSessionReducer } from '@context/SessionContext/SessionContext';
import Field from '@shared/Field/Field';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const Profile: React.FC = () => {
  const [session] = useSessionReducer();
  const [revealPhone, toggleRevealPhone] = React.useReducer((s) => !s, false);
  function onRevealPhoneNumber() {
    toggleRevealPhone();
  }
  if (session.validSession)
    return (
      <ScrollView>
        <Space spacing={2} container grow direction='vertical'>
          <Space spacing={2} direction='vertical' alignItems='center'>
            <Avatar size='background' />
            {session.nickname ? (
              <Flex direction='column'>
                <Typography variant='h3' bold>
                  {session.name}
                </Typography>
                <Typography color='textSecondary' variant='body2' align='center'>
                  {session.nickname}
                </Typography>
              </Flex>
            ) : (
              <Typography variant='h3' bold>
                {session.name}
              </Typography>
            )}
          </Space>
        </Space>
        <Tabs options={['Personal', 'School']} center>
          <Tab>
            <Card>
              <Typography>Hello World</Typography>
            </Card>
            <Card>
              <Typography>Hello World</Typography>
            </Card>
          </Tab>
          <Tab>
            <Container>
              <Typography>Tab 2</Typography>
            </Container>
          </Tab>
        </Tabs>
      </ScrollView>
    );
  return null;
};

export default Profile;

{
  /* <Card> */
}
{
  /* <Space spacing={1} direction='vertical'> */
}
// <Typography variant='h3' bold>
// Information
// </Typography>
// <Field title='Phone Number' text={session.phoneNumber} reveal hint={/\d\d\d\d/} />
// <Field
// title='Home Address'
// text={session.address.replace(/<br>/, ', ')}
// reveal
// hint={/\w+, [A-Z][A-Z] ((\d{5})(-\d{4})?)/}
// />
// <Field title='School Email' text={session.email} reveal hint={/@.*/} />
// </Space>
// </Card>
