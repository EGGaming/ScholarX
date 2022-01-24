import React from 'react';

const useComponentMounted = (): boolean => {
  const isMountedRef = React.useRef(false);
  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef.current;
};

export default useComponentMounted;
