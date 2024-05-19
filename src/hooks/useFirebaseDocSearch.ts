import { useState } from 'react';

import useDebouncedCallback from './useDebouncedCallback';

export function useFirebaseDocSearch() {
  const [search, setSearch] = useState<string>('');

  const onChangeSearchHandler = useDebouncedCallback(
    (value: string) => {
      setSearch(value);
    },
    [],
    300
  );

  return {
    search,
    setSearch: onChangeSearchHandler,
  };
}
