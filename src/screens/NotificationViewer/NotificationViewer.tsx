import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useNotificationDispatch } from '@context/NotificationContext/NotificationContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { format, isToday, isYesterday } from 'date-fns';
import RenderHTML, { HTMLContentModel, HTMLElementModel, MixedStyleDeclaration } from 'react-native-render-html';
import isThisWeek from 'date-fns/isThisWeek';
import Icon from '@components/Icon/Icon';
import Attachment from '@components/Attachment/Attachment';
import Button from '@components/Button/Button';

const customHTMLElementModels = {
  'o:p': HTMLElementModel.fromCustomModel({
    tagName: 'o:p',
    mixedUAStyles: {
      fontSize: 15.75,
    },
    contentModel: HTMLContentModel.block,
  }),
  font: HTMLElementModel.fromCustomModel({
    tagName: 'font',
    mixedUAStyles: {
      fontSize: 15.75,
    },
    contentModel: HTMLContentModel.block,
  }),
};

const NotificationViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'NotificationViewer'>> = (props) => {
  const { width } = useWindowDimensions();
  const {
    navigation,
    route: {
      params: { message, parsedDate },
    },
  } = props;
  const theme = useAppTheme();
  const [client] = useStudentVue();
  const dispatch = useNotificationDispatch();
  const timestamp = React.useMemo(() => {
    if (isToday(parsedDate)) return `Today, ${format(parsedDate, 'do MMMM h:mm a')}`;
    if (isYesterday(parsedDate)) return `Yesterday, ${format(parsedDate, 'do MMMM h:mm a')}`;
    return format(parsedDate, 'do MMMM h:mm a');
  }, [parsedDate]);

  const tagStyles = React.useMemo(
    (): Record<string, MixedStyleDeclaration> => ({
      body: {
        paddingBottom: 32,
      },
      p: {
        color: theme.palette.text.secondary,
        fontSize: 15.75,
        lineHeight: 24,
        letterSpacing: 0.6,
      },
      li: {
        color: theme.palette.text.secondary,
        fontSize: 15.75,
        paddingLeft: 16,
      },
      span: {
        color: theme.palette.text.secondary,
        fontSize: 15.75,
        letterSpacing: 0.6,
      },
    }),
    [theme]
  );

  React.useEffect(() => {
    (async () => {
      await client.updateMessage(message);
      dispatch({ type: 'MARK_AS_READ', message });
    })();
  }, []);

  return (
    <Container scrollable>
      <Space spacing={1} direction='vertical'>
        <Space spacing={0.5} direction='vertical'>
          <Typography variant='body2' color='textSecondary'>
            {timestamp}
          </Typography>
          <Typography variant='h2' bold>
            {message.$.SubjectNoHTML}
          </Typography>
          <Space spacing={1} alignItems='center'>
            <Icon bundle='FontAwesome5' name='user' />
            <Typography>{message.$.From}</Typography>
          </Space>
        </Space>
        {typeof message.AttachmentDatas[0] != 'string' &&
          message.AttachmentDatas[0].AttachmentData.map((data) => (
            <Attachment
              key={data.$.SmAttachmentGU}
              SmAttachmentGU={data.$.SmAttachmentGU}
              AttachmentName={data.$.AttachmentName}
            />
          ))}
        <RenderHTML
          baseStyle={{ padding: theme.spacing(0, 0, 16, 0) }}
          // enableCSSInlineProcessing={false}
          ignoredDomTags={['meta']}
          contentWidth={width}
          source={{ html: message.$.Content }}
          tagsStyles={tagStyles}
          customHTMLElementModels={customHTMLElementModels}
        />
      </Space>
    </Container>
  );
};

export default NotificationViewer;
