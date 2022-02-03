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
import { AppColors } from '@theme/core.types';
import { GradeSymbolContainer } from './Class.base';

const Class: React.FC<ClassProps> = (props) => {
  const theme = useAppTheme();
  const { class: classSchedule, classInfo } = props;
  function handleEmail() {
    Linking.openURL(`mailto:${classSchedule.teacher.email}`);
  }

  const gradeColor: AppColors = React.useMemo((): AppColors => {
    switch (classInfo.grade.symbol) {
      case 'A':
      case '4':
        return 'success';
      case 'B':
      case '3':
      default:
        return 'primary';
      case 'C':
      case '2':
        return 'warning';
      case 'D':
      case 'F':
      case '1':
        return 'error';
    }
  }, [classInfo.grade.symbol]);

  return (
    <Space spacing={1}>
      <GradeSymbolContainer>
        <Typography variant='h1' bold color={gradeColor}>
          {classInfo.grade.symbol}
        </Typography>
        <Typography variant='body2' bold color='textSecondary'>
          ({classInfo.grade.raw}%)
        </Typography>
      </GradeSymbolContainer>
      <Flex direction='column' shrink>
        <Typography bold numberOfLines={1}>
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
  );

  return (
    <Card width={300}>
      <Space spacing={1} direction='vertical'>
        <Space spacing={1} direction='vertical' alignItems='center'>
          <GradeSymbolContainer>
            <Typography variant='h1' bold color={gradeColor}>
              {classInfo.grade.symbol}
            </Typography>
            <Typography variant='caption' bold color='textSecondary'>
              ({classInfo.grade.raw}%)
            </Typography>
          </GradeSymbolContainer>
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
        <Button
          title='Assignments'
          onPress={() => {}}
          variant='contained'
          color={theme.mode === 'dark' ? 'secondary' : 'primary'}
          textCentered
          icon={<Icon bundle='Feather' name='clock' />}
        />
      </Space>
    </Card>
  );
};

export default React.memo(Class);
