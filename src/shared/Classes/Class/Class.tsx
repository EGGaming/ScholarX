import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import React from 'react';
import Icon from '@components/Icon/Icon';
import Button from '@components/Button/Button';
import { ClassProps } from './Class.types';
import { useAppTheme } from '@theme/core';
import { Linking } from 'react-native';
import Divider from '@components/Divider/Divider';

const Class: React.FC<ClassProps> = (props) => {
  const theme = useAppTheme();
  const { class: classSchedule } = props;
  function handleEmail() {
    Linking.openURL(`mailto:${classSchedule.teacher.email}`);
  }
  return (
    <Card width={300}>
      <Space spacing={1} direction='vertical'>
        <Space spacing={1} alignItems='center' direction='vertical'>
          <Flex alignItems='center' direction='column'>
            <Typography variant='h1' bold color='secondary'>
              B+
            </Typography>
            <Typography variant='body2' bold color='textSecondary'>
              (84.5%)
            </Typography>
          </Flex>
          <Flex direction='column' alignItems='center'>
            <Flex justifyContent='space-between' alignItems='center'>
              <Typography variant='caption' color='primary'>
                Period {classSchedule.period}
              </Typography>
            </Flex>
            <Typography bold align='center' numberOfLines={1}>
              {classSchedule.name}
            </Typography>
            <Space spacing={0.5} alignItems='center'>
              <Typography variant='body2' color='textSecondary'>
                {classSchedule.teacher.name}
              </Typography>
              <IconButton icon={<Icon bundle='Feather' name='mail' />} size='small' onPress={handleEmail} />
            </Space>
          </Flex>
        </Space>
        <Button title='Assignments' onPress={() => {}} textCentered variant='contained' />
      </Space>
    </Card>
  );
};

export default React.memo(Class);
