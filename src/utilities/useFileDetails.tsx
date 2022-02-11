import useFileExtensionIcon from '@utilities/useFileExtensionIcon';
import React from 'react';

export default function useFileDetails(filename: string) {
  const icon = useFileExtensionIcon(filename);
  const shortenedFileName = React.useMemo(() => {
    if (filename.length > 15) {
      return `${filename.substring(0, 14)}...${filename.substring(filename.length - 6)}`;
    }
    return filename;
  }, [filename]);

  return [shortenedFileName, icon];
}
