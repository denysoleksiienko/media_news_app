import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

import FirestoreService from '@/firebase/FirestoreService';
import { NEWS } from '@/firebase/collections';
import { useFirebaseDocSearch } from '@/hooks/useFirebaseDocSearch';
import { useLoading } from '@/hooks/useLoading';
import { FirestoreData, QueryGetAllTypes } from '@/types/firestore';

interface IGlodalContext {
  isLoading: boolean;
  data: FirestoreData | null;
  onRefresh: () => void;
  refreshing: boolean;
  search: string;
  onSearch: (val: string) => void;
}

const GlodalContext = React.createContext<IGlodalContext>({
  isLoading: false,
  data: null,
  onRefresh: () => undefined,
  refreshing: false,
  search: '',
  onSearch: () => undefined,
});

const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const { search, setSearch } = useFirebaseDocSearch();
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setSearch('');
      setData(null);
      setRefreshing(false);
    }, 1000);
  }, [setSearch]);

  useEffect(() => {
    const params: QueryGetAllTypes = { path: NEWS };
    if (search) {
      params.whereFilter = {
        key: 'title',
        opString: '==',
        value: search,
      };
    }

    const fetch = async () => {
      startLoading();
      try {
        const resp = await FirestoreService.getAll(params);
        setData(resp);
      } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
      } finally {
        stopLoading();
      }
    };

    fetch();
  }, [search, refreshing]);

  const value = useMemo(
    () => ({
      isLoading: loading,
      data,
      refreshing,
      onRefresh,
      search,
      onSearch: setSearch,
    }),
    [data, loading, onRefresh, refreshing, search, setSearch]
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
