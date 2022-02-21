import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import useFileDetails from '@utilities/useFileDetails';
import React from 'react';
import { AssignemntResourceProps } from './AssignmentResource.types';
import { Linking, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import useBytesString from '@utilities/useBytesString';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import { HoldItem } from 'react-native-hold-menu';
import { AssignmentResourceContainer } from '@components/AssignmentResource/AssignmentResource.base';

const AssignmentResource: React.FC<AssignemntResourceProps> = (props) => {
  if (props.serverRoute) {
    const { fileName, serverRoute } = props;
    const [name, icon] = useFileDetails(fileName);
    const [appState] = useAppReducer();
    const [bytes, setBytes] = React.useState<number | null>();
    const uriRef = React.useRef<string>();
    const fileRef = React.useRef<string>(FileSystem.cacheDirectory + fileName);
    const fileSize = useBytesString(bytes);

    React.useEffect(() => {
      download();
    }, []);

    async function download() {
      const cached = await FileSystem.getInfoAsync(fileRef.current);
      const cachedUri = await FileSystem.getContentUriAsync(fileRef.current);
      if (!cached.exists) {
        const { uri } = await FileSystem.downloadAsync(appState.districtUrl + serverRoute, fileRef.current);
        const meta = await FileSystem.getInfoAsync(uri);
        uriRef.current = await FileSystem.getContentUriAsync(fileRef.current);
        setBytes(meta.size ?? null);
      } else {
        uriRef.current = cachedUri;
        setBytes(cached.size ?? null);
      }
    }

    const openFile = React.useCallback(async () => {
      try {
        console.log(`Opening pdf at ${uriRef.current}`);
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW' as any, {
          data: uriRef.current,
          flags: 1,
        });
      } catch (e) {
        console.error(e);
      }
    }, [uriRef.current]);

    const shareFile = React.useCallback(async () => {
      try {
        await Sharing.shareAsync(fileRef.current);
      } catch (e) {
        console.error(e);
      }
    }, [fileRef.current]);

    const menuItems: MenuItemProps[] = React.useMemo(
      () => [
        { text: 'Actions', isTitle: true },
        { text: 'Open', onPress: openFile },
        { text: 'Share', onPress: shareFile, icon: 'share' },
      ],
      [openFile, shareFile]
    );

    return (
      <AssignmentResourceContainer>
        <HoldItem items={menuItems}>
          <Card>
            <Space spacing={1} alignItems='center' grow>
              {icon}
              <Flex direction='column'>
                <TouchableWithoutFeedback onPress={openFile}>
                  <Typography numberOfLines={1} color='primary' bold variant='body2'>
                    {fileName}
                  </Typography>
                </TouchableWithoutFeedback>
                <Typography color='textSecondary' variant='caption'>
                  {fileSize}
                </Typography>
              </Flex>
            </Space>
          </Card>
        </HoldItem>
      </AssignmentResourceContainer>
    );
  }

  // todo: add URL Type
  const handleOpenURL = React.useCallback(() => {
    Linking.openURL(props.fileName);
  }, [props.fileName]);
  const menuItems: MenuItemProps[] = React.useMemo(
    () => [
      { text: 'Actions', isTitle: true },
      {
        text: 'Open URL',
        onPress: handleOpenURL,
        icon: 'link',
      },
      {
        text: 'Copy URL',
        onPress: () => {
          Clipboard.setString(props.fileName);
          ToastAndroid.showWithGravity(`Copied to clipboard.`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        },
        icon: 'copy',
      },
    ],
    [props.fileName]
  );
  return (
    <AssignmentResourceContainer>
      <HoldItem items={menuItems}>
        <Card>
          <TouchableWithoutFeedback onPress={handleOpenURL}>
            <Typography bold color='primary' variant='body2' numberOfLines={1}>
              {props.fileName}
            </Typography>
          </TouchableWithoutFeedback>
        </Card>
      </HoldItem>
    </AssignmentResourceContainer>
  );
};

export default AssignmentResource;
