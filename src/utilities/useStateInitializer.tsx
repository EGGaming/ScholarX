import { useStudentVue } from '@context/StudentVueClientContext/StudentVueClientContext';
import React from 'react';
export default function useStateInitializer<T>(
  fn: () => Promise<T>,
  setState: React.Dispatch<React.SetStateAction<T | undefined>>
) {
  React.useEffect(() => {
    (async () => {
      try {
        const data = await fn();
        setState(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
}
