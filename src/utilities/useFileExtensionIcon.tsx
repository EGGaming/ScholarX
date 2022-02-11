import Icon from '@components/Icon/Icon';
import React from 'react';

export default function useFileExtensionIcon(filename: string): React.ReactElement<React.ComponentProps<typeof Icon>> {
  return React.useMemo(() => {
    const extension = (filename.match(/\.(doc|docx|pptx|ppt|pdf|jpg|jpeg|png|gif)/g) ?? [''])[0].substring(1);
    switch (extension) {
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
  }, [filename]);
}
