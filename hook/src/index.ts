import { useEffect, useState } from 'react';

type CallbackType = (isVisible: boolean) => void;

interface HookReturn {
  count: number;
  visible: boolean;
  onVisibilityChange: (fn: CallbackType) => () => void;
}

function getVisisbleStatus() {
  return !document.hidden;
}

function useDocumentVisibility(): HookReturn {
  const [isVisible, setIsVisible] = useState(getVisisbleStatus());
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    document.addEventListener('visibilitychange', eventListener);

    return () => document.removeEventListener('visibilitychange', eventListener, true);
  }, []);

  const eventListener = () => {
    setIsVisible(getVisisbleStatus());

    if (getVisisbleStatus()) {
      setInactiveCount((prev) => prev + 1);
    }
  };

  const onVisibilityChange = (fn: CallbackType) => {
    const callback = () => fn(getVisisbleStatus());

    document.addEventListener('visibilitychange', callback);

    return () => document.removeEventListener('visibilitychange', callback);
  };

  return {
    count: inactiveCount,
    visible: isVisible,
    onVisibilityChange,
  };
}

export default useDocumentVisibility;
