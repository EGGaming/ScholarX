import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/Root/Root.types';
import Container from '@components/Container/Container';
import Typography from '@components/Typography/Typography';
import { TitleContainer } from './EventViewer.base';
import Space from '@components/Space/Space';

const EventViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'EventViewer'>> = (props) => {
  const {
    navigation,
    route: {
      params: { event, parsedDate, title, calendar },
    },
  } = props;
  const assignments = React.useMemo(() => calendar.filter((other) => other.Date == event.Date), [calendar]);

  return (
    <Container scrollable>
      <Space spacing={1} direction='vertical'>
        <TitleContainer>
          <Typography variant='h2'>{title}</Typography>
          <Typography color='textSecondary'>{event.DayType}</Typography>
        </TitleContainer>
        {assignments.map((t) => (
          <Typography key={t.Title}>{t.Title}</Typography>
        ))}
      </Space>
    </Container>
  );
};

export default EventViewer;
