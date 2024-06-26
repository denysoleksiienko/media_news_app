import React, { FC } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Platform, View } from 'react-native';
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

  const navToNewsById = ({
    documentId,
    title,
  }: {
    documentId: string;
    title: string;
  }) => {
    navigation.navigate(PATHS.VIEW_NEWS, { documentId, title });
  };

  const createNews = () => {
    navigation.navigate(PATHS.ADD_NEWS);
  };

  const openModal = (documentId: string) => {
    navigation.navigate(PATHS.MODAL, { documentId });
  };

  return (
    <SafeAreaViewContainer
      backgroundColor='extraLightGray'
      safeBottom={false}
      safeTop
    >
      <Layout
        mb={20}
        mt={Platform.OS === 'android' ? 10 : undefined}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        variant='row'
      >
        <Input
          autoCapitalize='sentences'
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
            paddingBottom: Platform.select({ ios: bottom, android: 16 }),
          }}
          data={data?.results}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 20 }} />}
          ListEmptyComponent={<EmptyList />}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <NewsCard
              delayLongPress={400}
              onLongPress={() => openModal(item.documentId)}
              onPress={() =>
                navToNewsById({
                  documentId: item.documentId,
                  title: item.title,
                })
              }
              {...item}
            />
          )}
        />
      )}
    </SafeAreaViewContainer>
  );
};

export default NewsListScreen;
