import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/Root/Root.types';
import Container from '@components/Container/Container';
import Typography from '@components/Typography/Typography';
import { AssignmentContainer, AssignmentHeaderContainer, TitleContainer } from './EventViewer.base';
import Space from '@components/Space/Space';
import { Assignment } from './EventViewer.types';
import Divider from '@components/Divider/Divider';
import Icon from '@components/Icon/Icon';

const EventViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'EventViewer'>> = (props) => {
  const {
    navigation,
    route: {
      params: { event, parsedDate, title, calendar },
    },
  } = props;
  const assignments: Assignment[] = React.useMemo(
    () =>
      calendar
        .filter((other) => other.Date == event.Date)
        .map((assignment) => {
          const teacherName = (assignment.Title.match(/\w+, \w/) ?? [''])[0];
          const className = (assignment.Title.match(/\s\s.*(?= : )/) ?? [''])[0].substring(2);
          const period = Number((assignment.Title.match(/\(\d\)/) ?? [''])[0].replace(/\(|\)/g, ''));
          const assignmentName = assignment.Title.substring(teacherName.length + className.length + 5);
          const score = (assignmentName.match(/\s\-\sScore/) ?? [''])[0];
          return {
            teacher: teacherName,
            assignmentName,
            class: className.substring(0, className.length - 3),
            score,
            period,
          };
        }),
    [calendar]
  );

  return (
    <Container scrollable>
      <TitleContainer>
        <Typography variant='h2'>{title}</Typography>
        <Typography color='textSecondary'>{event.DayType}</Typography>
      </TitleContainer>
      {assignments.map((t) => (
        <AssignmentContainer key={t.assignmentName}>
          <Space spacing={0.5} direction='vertical'>
            <AssignmentHeaderContainer>
              <Space spacing={1} alignItems='center'>
                <Icon bundle='FontAwesome5' name='user' />
                <Typography bold>{t.teacher}</Typography>
              </Space>
              <Typography variant='body2' color='textSecondary'>
                Period {t.period}
              </Typography>
            </AssignmentHeaderContainer>
            <Typography variant='caption'>{t.class}</Typography>
            <Typography variant='body2'>{t.assignmentName}</Typography>
          </Space>
        </AssignmentContainer>
      ))}
    </Container>
  );
};

export default EventViewer;
