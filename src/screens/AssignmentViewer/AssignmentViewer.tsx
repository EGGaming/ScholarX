import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/Root/Root.types';
import Flex from '@components/Flex/Flex';
import Container from '@components/Container/Container';
import Typography from '@components/Typography/Typography';
import Card from '@components/Card/Card';
import Field from '@shared/Field/Field';
import Space from '@components/Space/Space';
import { format } from 'date-fns';
import { ScrollView } from 'react-native';
import Attachment from '@components/Attachment/Attachment';
import { useAppReducer } from '@context/AppContext/AppContext';
import AssignmentResource from '@components/AssignmentResource/AssignmentResource';
import { AssignmentViewerContainer } from './AssignmentViewer.base';
import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import Scrollable from '@components/Scrollable/Scrollable';

const AssignmentViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'AssignmentViewer'>> = ({
  navigation,
  route,
}) => {
  const { assignment } = route.params;

  return (
    <Scrollable>
      <Flex direction='column'>
        <Container>
          <Typography variant='h3'>{assignment.name}</Typography>
          <Typography color='textSecondary'>{assignment.type}</Typography>
        </Container>
        {assignment.resources ? (
          <Space spacing={0.5} direction='vertical' grow>
            <AssignmentViewerContainer>
              <Typography color='textSecondary'>Resources</Typography>
            </AssignmentViewerContainer>
            <Space spacing={1} container containerProps={{ header: true }} grow>
              {assignment.resources.map((res) =>
                res.url ? <AssignmentResource key={res.url} fileName={res.url} /> : undefined
              )}
              {assignment.resources.map((res) => (
                <AssignmentResource fileName={res.file.name} serverRoute={res.file.serverRoute} key={res.resource.id} />
              ))}
            </Space>
          </Space>
        ) : undefined}
        <Space spacing={2} direction='vertical' container>
          <Field
            title='Score'
            text={assignment.score.value}
            typographyProps={{ color: assignment.score.type === 'Not Due' ? 'textSecondary' : 'secondary' }}
          />
          <Field title='Score Type' text={assignment.score.type} />
          <Field title='Start Date' text={format(Date.parse(assignment.date.date), 'd MMMM, yyyy')} />
          <Field title='Due Date' text={format(Date.parse(assignment.date.dueDate), 'd MMMM, yyyy')} />
        </Space>

        <Container>
          {assignment.description ? (
            <Card>
              <Typography bold>Description</Typography>
              <Typography color='textSecondary' variant='body2'>
                {assignment.description}
              </Typography>
            </Card>
          ) : undefined}
          {assignment.notes ? (
            <Card>
              <Typography bold>Notes</Typography>
              <Typography color='textSecondary' variant='body2'>
                {assignment.notes}
              </Typography>
            </Card>
          ) : undefined}
          {assignment.hasDropBox ? (
            <Space spacing={1} direction='vertical'>
              <Typography variant='h3'>Dropbox</Typography>
              <Space spacing={1}>
                <Button title='Upload file' icon={<Icon bundle='Feather' name='link' />} />
              </Space>
            </Space>
          ) : undefined}
        </Container>
      </Flex>
    </Scrollable>
  );
};

export default AssignmentViewer;
