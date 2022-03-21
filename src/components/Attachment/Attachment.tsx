import { AttachmentContainer } from '@components/Attachment/Attachment.base';
import { AttachmentProps } from '@components/Attachment/Attachment.types';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import useBytesString from '@utilities/useBytesString';
import useFileExtensionIcon from '@utilities/useFileExtensionIcon';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { HoldItem } from 'react-native-hold-menu';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';

const Attachment: React.FC<AttachmentProps> = ({ attachment }) => {
  const [state] = useAppReducer();
  const [client] = useStudentVue();
  const [bytes, setBytes] = React.useState<number | null>();
  const uriRef = React.useRef<string>();
  const fileRef = React.useRef<string>(FileSystem.cacheDirectory + attachment.name);
  const fileName = (attachment.name.match(/.*(?=[\.])/g) ?? [''])[0];
  const fileExtension = attachment.fileExtension;
  const shortenedFileName = React.useMemo(() => {
    if (fileName.length > 10)
      return `${fileName.substring(0, 9)}...${fileName.substring(fileName.length - 6)}.${fileExtension}`;
    return `${fileName}.${fileExtension}`;
  }, [fileName, fileExtension]);
  const bytesText = useBytesString(bytes);
  const FileIcon: React.ReactElement<React.ComponentProps<typeof Icon>> = useFileExtensionIcon(attachment.name);

  React.useEffect(() => {
    download();
  }, []);

  async function download() {
    const cached = await FileSystem.getInfoAsync(fileRef.current);
    const cachedUri = await FileSystem.getContentUriAsync(fileRef.current);
    if (!cached.exists) {
      const base64 = await attachment.get();
      await FileSystem.writeAsStringAsync(fileRef.current, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const uri = await FileSystem.getContentUriAsync(fileRef.current);
      const meta = await FileSystem.getInfoAsync(uri);
      uriRef.current = uri;
      setBytes(meta.size ?? null);
    } else {
      uriRef.current = cachedUri;
      setBytes(cached.size ?? null);
    }
  }

  const openFile = React.useCallback(async () => {
    try {
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
  }, []);

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
      <AttachmentContainer>
        <Space spacing={1} alignItems='center'>
          {FileIcon}
          <Flex direction='column'>
            <Typography color='primary' variant='body2' bold onPress={openFile}>
              {shortenedFileName}
            </Typography>
            <Typography color='textSecondary' variant='caption'>
              {bytesText}
            </Typography>
          </Flex>
        </Space>
      </AttachmentContainer>
    </HoldItem>
  );
};

export default React.memo(Attachment);
