import { useCallback, useEffect, useRef } from 'react';

export default function useDebouncedCallback(
  next: (...args: any) => void,
  dependencies: any[],
  debounce = 300
): (...args: any[]) => void {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const callback = useCallback(
    (...args: any) => {
      clearTimeout(timer.current as unknown as ReturnType<typeof setTimeout>);
      // @ts-ignore
      timer.current = setTimeout(() => next(...args), debounce);
    },
    [debounce, next]
  );

  useEffect(
    () => () =>
      clearTimeout(timer.current as unknown as ReturnType<typeof setTimeout>),
    []
  );

  return callback;
}
