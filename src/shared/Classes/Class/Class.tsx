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
  const { class: classSchedule, classInfo } = props;
  function handleEmail() {
    Linking.openURL(`mailto:${classSchedule.teacher.email}`);
  }
  // console.log(classInfo);
  return (
    <Card width={300}>
      <Space spacing={1} direction='vertical' alignItems='center'>
        <Flex alignItems='center' direction='column'>
          <Typography variant='h1' bold color='secondary'>
            {classInfo.grade.symbol}
          </Typography>
          <Typography variant='body2' bold color='textSecondary'>
            ({classInfo.grade.raw}%)
          </Typography>
        </Flex>
        <Flex direction='column' alignItems='center'>
          <Space spacing={0.5} alignItems='center'>
            <Typography variant='caption' color='primary'>
              Period {classSchedule.period}
            </Typography>
            <Divider orientation='vertical' />
            <Typography variant='caption' color='textSecondary'>
              Room {classSchedule.room}
            </Typography>
          </Space>
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
    </Card>
  );
};

export default React.memo(Class);
