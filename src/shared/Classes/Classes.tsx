import Card from '@components/Card/Card';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { EventsContainer } from '@shared/Events/Events.base';
import React from 'react';
import { ScrollView } from 'react-native';

const Classes: React.FC = () => {
  const [client] = useStudentVue();
  React.useEffect(() => {
    fetchScheduleFromAPI();
  }, []);
  async function fetchScheduleFromAPI() {
    const t = await client.classSchedule(2);
    console.log(t);
  }
  return (
    <Space spacing={1} direction='vertical'>
      <EventsContainer>
        <Typography bold variant='h3'>
          My Classes
        </Typography>
      </EventsContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Card>
          <Typography>AP United States History</Typography>
        </Card>
      </ScrollView>
    </Space>
  );
};

export default React.memo(Classes);
