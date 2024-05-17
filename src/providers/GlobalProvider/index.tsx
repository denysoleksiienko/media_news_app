import React, { FC, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

import FirestoreService from '@/firebase/FirestoreService';
import { NEWS } from '@/firebase/collections';
import { useLoading } from '@/hooks/useLoading';
import { FirestoreData } from '@/types/firestore';

interface IGlodalContext {
  isLoading: boolean;
  data: FirestoreData | null;
  onRefresh: () => void;
  refreshing: boolean;
}

const GlodalContext = React.createContext<IGlodalContext>({
  isLoading: false,
  data: null,
  onRefresh: () => undefined,
  refreshing: false,
});

const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData(null);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    if (data) stopLoading();

    if (!data) {
      startLoading();

      try {
        const fetchData = async () => {
          const resp = await FirestoreService.getAll({ path: NEWS });
          setData(resp);
        };
        fetchData();
      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      }
    }
  }, [data]);

  const value = useMemo(
    () => ({ isLoading: loading, data, refreshing, onRefresh }),
    [data, loading, refreshing]
  );

  return (
    <GlodalContext.Provider value={value}>{children}</GlodalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = React.useContext(GlodalContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
