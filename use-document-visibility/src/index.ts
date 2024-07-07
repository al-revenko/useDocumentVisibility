import { useEffect, useState } from 'react';

type CallbackType = (isVisible: boolean) => void;

interface HookReturn {
  count: number;
  visible: boolean;
  onVisibilityChange: (fn: CallbackType) => () => void;
}

function getVisibleStatus() {
  return !document.hidden;
}

export function useDocumentVisibility(): HookReturn {
  const [isVisible, setIsVisible] = useState(getVisibleStatus());
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    document.addEventListener('visibilitychange', eventListener);

    return () => document.removeEventListener('visibilitychange', eventListener);
  }, []);

  const eventListener = () => {
    setIsVisible(getVisibleStatus());

    if (getVisibleStatus()) {
      setInactiveCount((prev) => prev + 1);
    }
  };

  const onVisibilityChange = (fn: CallbackType) => {
    const callback = () => fn(getVisibleStatus());

    document.addEventListener('visibilitychange', callback);

    return () => document.removeEventListener('visibilitychange', callback);
  };

  return {
    count: inactiveCount,
    visible: isVisible,
    onVisibilityChange,
  };
}
