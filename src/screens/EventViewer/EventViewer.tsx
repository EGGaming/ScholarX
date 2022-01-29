import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/Root/Root.types';
import Container from '@components/Container/Container';
import Typography from '@components/Typography/Typography';
import { AssignmentFooterContainer, AssignmentHeaderContainer, TitleContainer } from './EventViewer.base';
import Space from '@components/Space/Space';
import { Assignment } from './EventViewer.types';
import Divider from '@components/Divider/Divider';
import Icon from '@components/Icon/Icon';
import { ScrollView } from 'react-native';
import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import _ from 'lodash';
import { useCalendar } from '@context/CalendarContext/CalendarContext';

const EventViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'EventViewer'>> = (props) => {
  const {
    route: {
      params: { event, title },
    },
  } = props;
  const [calendar] = useCalendar();
  const assignments: Assignment[] = React.useMemo(
    () =>
      calendar
        ? calendar.events
            .filter((other) => other.Date == event.Date)
            .map((assignment) => {
              const teacherName = (assignment.Title.match(/\w+, \w/) ?? [''])[0];
              const className = (assignment.Title.match(/\s\s.*(?= : )/) ?? [''])[0].substring(2);
              const period = Number((assignment.Title.match(/\(\d\)/) ?? [''])[0].replace(/\(|\)/g, ''));
              const assignmentName = assignment.Title.substring(teacherName.length + className.length + 5);
              const score = (assignmentName.match(/\s\-\sScore.*/) ?? [''])[0];
              return {
                teacher: teacherName,
                assignmentName: assignmentName.substring(0, assignmentName.length - score.length - 1),
                class: className.substring(0, className.length - 3),
                score: (() => {
                  const temp = score.replace(/\s-\sScore:\s/, '');
                  switch (temp) {
                    case '':
                    case '-':
                      return '-';
                    default:
                      return `${temp}%`;
                  }
                })(),
                period,
              };
            })
        : [],
    [calendar]
  );

  return (
    <ScrollView>
      <TitleContainer>
        <Typography variant='h2'>{title}</Typography>
        <Typography color='textSecondary'>{event.DayType}</Typography>
      </TitleContainer>
      {assignments.map((t) => (
        <Card key={t.assignmentName}>
          <Space spacing={0.5} direction='vertical'>
            <Flex direction='column'>
              <AssignmentHeaderContainer>
                <Flex shrink>
                  <Typography variant='body2' bold numberOfLines={1}>
                    {t.class}
                  </Typography>
                </Flex>

                <Typography variant='body2' color='textSecondary'>
                  Period {t.period}
                </Typography>
              </AssignmentHeaderContainer>
              <Space spacing={1} alignItems='center'>
                <Icon bundle='FontAwesome5' name='user' color='textSecondary' size='small' />
                <Typography color='textSecondary' variant='caption'>
                  {t.teacher}
                </Typography>
              </Space>
            </Flex>
            <Typography>{t.assignmentName}</Typography>
            <AssignmentFooterContainer>
              <Typography>
                Score:{' '}
                <Typography bold color='primary'>
                  {t.score}
                </Typography>
              </Typography>
            </AssignmentFooterContainer>
          </Space>
        </Card>
      ))}
    </ScrollView>
  );
};

export default EventViewer;
