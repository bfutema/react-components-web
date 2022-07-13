/* eslint-disable consistent-return */
import { useEffect, useRef } from 'react';

function useClickAway(
  ref: any,
  handler: (event: Event | MouseEvent) => void,
  options: { enabled: boolean },
) {
  const { enabled = true } = options || {};
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;

    function internalHandler(e: Event): void {
      if (ref.current && !ref.current.contains(e.target)) {
        return handlerRef.current(e);
      }
    }

    document.addEventListener('mousedown', internalHandler);

    return () => {
      document.removeEventListener('mousedown', internalHandler);
    };
  }, [ref, enabled]);
}

export { useClickAway };
