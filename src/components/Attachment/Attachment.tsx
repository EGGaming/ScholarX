import { AttachmentContainer } from '@components/Attachment/Attachment.base';
import { AttachmentProps } from '@components/Attachment/Attachment.types';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppReducer } from '@context/AppContext/AppContext';
import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { HoldItem } from 'react-native-hold-menu';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';

const Attachment: React.FC<AttachmentProps> = ({ SmAttachmentGU, AttachmentName }) => {
  const [state] = useAppReducer();
  const [client] = useStudentVue();
  const [bytes, setBytes] = React.useState<number | null>();
  const uriRef = React.useRef<string>();
  const fileRef = React.useRef<string>(FileSystem.cacheDirectory + AttachmentName);
  const fileName = (AttachmentName.match(/.*(?=[\.])/g) ?? [''])[0];
  const fileExtension = AttachmentName.substring(fileName.length + 1);
  const shortenedFileName = React.useMemo(() => {
    if (fileName.length > 10)
      return `${fileName.substring(0, 9)}...${fileName.substring(fileName.length - 6)}.${fileExtension}`;
    return `${fileName}.${fileExtension}`;
  }, [fileName, fileExtension]);
  const bytesText = React.useMemo(() => {
    if (bytes === null) return 'Unknown size';
    if (bytes === undefined) return 'Downloading...';
    if (bytes < 1000) return `${bytes} B`;
    if (bytes >= 1000 && bytes < 1000000) return `${bytes} KB`;
    if (bytes >= 1000000 && bytes < 1e9) return `${bytes} MB`;
    if (bytes >= 1e9) return `${bytes} GB`;
  }, [bytes]);
  const FileIcon: React.ReactElement<React.ComponentProps<typeof Icon>> = React.useMemo(() => {
    switch (fileExtension) {
      case 'doc':
      case 'docx':
        return <Icon bundle='FontAwesome5' name='file-word' color='primary' size='large' />;
      case 'pptx':
      case 'ppt':
        return <Icon bundle='FontAwesome5' name='file-powerpoint' color='primary' size='large' />;
      case 'pdf':
        return <Icon bundle='FontAwesome5' name='file-pdf' color='primary' size='large' />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Icon bundle='FontAwesome5' name='file-image' color='primary' size='large' />;
      default:
        return <Icon bundle='FontAwesome5' name='file' />;
    }
  }, [AttachmentName]);

  React.useEffect(() => {
    download();
  }, []);

  async function download() {
    const cached = await FileSystem.getInfoAsync(fileRef.current);
    const cachedUri = await FileSystem.getContentUriAsync(fileRef.current);
    if (!cached.exists) {
      const attachment = await client.attachment(SmAttachmentGU);
      await FileSystem.writeAsStringAsync(fileRef.current, attachment.base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const uri = await FileSystem.getContentUriAsync(fileRef.current);
      const meta = await FileSystem.getInfoAsync(uri);
      uriRef.current = uri;
      setBytes(meta.size ? Math.round(meta.size / 1024) : null);
    } else {
      uriRef.current = cachedUri;
      setBytes(cached.size ? Math.round(cached.size / 1024) : null);
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
          <Space spacing={0} direction='vertical'>
            <Typography color='primary' variant='body2' bold onPress={openFile}>
              {shortenedFileName}
            </Typography>
            <Typography color='textSecondary' variant='caption'>
              {bytesText}
            </Typography>
          </Space>
        </Space>
      </AttachmentContainer>
    </HoldItem>
  );
};

export default React.memo(Attachment);
