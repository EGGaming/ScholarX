import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML, { HTMLContentModel, HTMLElementModel, MixedStyleDeclaration } from 'react-native-render-html';
import { Element } from 'react-native-render-html';

const customHTMLElementModels = {
  'o:p': HTMLElementModel.fromCustomModel({
    tagName: 'o:p',
    mixedUAStyles: {
      backgroundColor: 'blue',
    },
    contentModel: HTMLContentModel.block,
  }),
};

const NotificationViewer: React.FC<NativeStackScreenProps<RootStackParamList, 'NotificationViewer'>> = (props) => {
  const { width } = useWindowDimensions();
  const {
    navigation,
    route: {
      params: { message },
    },
  } = props;
  const theme = useAppTheme();

  const tagStyles = React.useMemo(
    (): Record<string, MixedStyleDeclaration> => ({
      body: {
        paddingBottom: 32,
      },
      p: {
        color: theme.palette.text.secondary,
        fontSize: 18,
        lineHeight: 27,
        letterSpacing: 0.5,
        backgroundColor: theme.palette.background.default,
      },
      li: {
        color: theme.palette.text.secondary,
        fontSize: 18,
        lineHeight: 27,
        letterSpacing: 0.5,
        backgroundColor: theme.palette.background.default,
        paddingLeft: 16,
      },
      span: {
        color: theme.palette.text.secondary,
        fontSize: 18,
        lineHeight: 27,
        letterSpacing: 0.5,
      },
      img: {
        display: 'none',
      },
    }),
    [theme]
  );

  React.useEffect(() => {
    console.log(message.AttachmentDatas[0].SmAttachmentGU);
  }, [message]);

  return (
    <Container scrollable>
      <Space spacing={2} direction='vertical'>
        <Space spacing={1} direction='vertical'>
          <Typography bold variant='h3'>
            {message.$.SubjectNoHTML}
          </Typography>
          <Space spacing={1} alignItems='center'>
            <Typography color='textSecondary'>
              By <Typography>{message.$.From}</Typography>
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              {message.$.BeginDate}
            </Typography>
          </Space>
        </Space>
        <Divider />
        <RenderHTML
          enableCSSInlineProcessing={false}
          ignoredDomTags={['meta', 'font']}
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
