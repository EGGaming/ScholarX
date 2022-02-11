import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import useFileDetails from '@utilities/useFileDetails';
import React from 'react';
import { AssignemntResourceProps } from './AssignmentResource.types';
import { Linking, TouchableWithoutFeedback } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import useBytesString from '@utilities/useBytesString';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import { HoldItem } from 'react-native-hold-menu';

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
        uriRef.current = uri;
        setBytes(meta.size ?? null);
      } else {
        uriRef.current = cachedUri;
        setBytes(cached.size ?? null);
      }
    }

    const openFile = async () => {
      try {
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW' as any, {
          data: uriRef.current,
          flags: 1,
        });
      } catch (e) {
        console.error(e);
      }
    };

    const shareFile = async () => {
      try {
        await Sharing.shareAsync(fileRef.current);
      } catch (e) {
        console.error(e);
      }
    };

    const menuItems: MenuItemProps[] = React.useMemo(
      () => [
        { text: 'Actions', isTitle: true },
        { text: 'Open', onPress: openFile },
        { text: 'Share', onPress: shareFile, icon: 'share' },
      ],
      [openFile, shareFile]
    );

    return (
      <HoldItem items={menuItems}>
        <Card>
          <Space spacing={1} alignItems='center'>
            {icon}
            <Flex direction='column'>
              <TouchableWithoutFeedback onPress={openFile}>
                <Typography color='primary' bold variant='body2'>
                  {name}
                </Typography>
              </TouchableWithoutFeedback>
              <Typography color='textSecondary' variant='caption'>
                {fileSize}
              </Typography>
            </Flex>
          </Space>
        </Card>
      </HoldItem>
    );
  }

  // todo: add URL Type
  return (
    <Card>
      <TouchableWithoutFeedback>
        <Typography bold color='primary' variant='body2' numberOfLines={1}>
          {props.fileName}
        </Typography>
      </TouchableWithoutFeedback>
    </Card>
  );
};

export default AssignmentResource;
