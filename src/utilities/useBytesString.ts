import React from 'react';

export default function useBytesString(bytes?: number | null) {
  return React.useMemo(() => {
    if (bytes === null) return 'Unknown size';
    if (bytes === undefined) return 'Downloading...';
    if (bytes < 1000) return `${bytes} B`;
    if (bytes >= 1000 && bytes < 1000000) return `${Math.round(bytes / 1000)} KB`;
    if (bytes >= 1000000 && bytes < 1e9) return `${Math.round(bytes / 1000 / 1000)} MB`;
    if (bytes >= 1e9) return `${Math.round(bytes / 1000 / 1000 / 1000)} GB`;
  }, [bytes]);
}
