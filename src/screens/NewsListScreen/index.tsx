import React, { FC } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AddIcon from '@/assets/icons/AddIcon.svg';
import EmptyList from '@/components/EmptyList';
import { Layout } from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import NewsCard from '@/components/NewsCard';
import { SafeAreaViewContainer } from '@/components/containers';
import { Input, ButtonIcon } from '@/components/elements';
import { PATHS } from '@/constants';
import { MainStackParamList } from '@/navigation/params';
import { useGlobalContext } from '@/providers/GlobalProvider';

type Props = StackScreenProps<MainStackParamList, PATHS.NEWS>;

const NewsListScreen: FC<Props> = ({ navigation }) => {
  const { isLoading, data, onRefresh, refreshing, search, onSearch } =
    useGlobalContext();

  const { bottom } = useSafeAreaInsets();

  const navToNewsById = (documentId: string) => {
    navigation.navigate(PATHS.VIEW_NEWS, { documentId });
  };

  const createNews = () => {
    navigation.navigate(PATHS.ADD_NEWS);
  };

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <SafeAreaViewContainer
      backgroundColor='extraLightGray'
      safeBottom={false}
      safeTop
    >
      <Layout
        mb={20}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        variant='row'
      >
        <Input
          containerStyle={{ flex: 1, marginEnd: 16 }}
          defaultValue={search}
          onChangeText={onSearch}
          placeholder='Search...'
          size='md'
        />
        <ButtonIcon icon={<AddIcon />} onPress={createNews} />
      </Layout>
      {isLoading ? (
        <LoadingSpinner backgroundColor='tranparent' />
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: bottom,
          }}
          data={data?.results}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 20 }} />}
          ListEmptyComponent={<EmptyList />}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <NewsCard
              onPress={() => navToNewsById(item.documentId)}
              {...item}
            />
          )}
        />
      )}
    </SafeAreaViewContainer>
  );
};

export default NewsListScreen;
