import React, { FC, useEffect, useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { Image, StyleSheet, View } from 'react-native';

import { Layout } from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SafeAreaScrollViewContainer } from '@/components/containers';
import { Typography } from '@/components/elements';
import { PATHS } from '@/constants';
import { NEWS } from '@/constants/collections';
import { useFirebaseDoc } from '@/hooks/useFirebaseDoc';
import { MainStackParamList } from '@/navigation/params';
import { theme } from '@/theme';
import { Results } from '@/types/firestore';
import { getDateFromNow, toDate } from '@/utils/js-utils';
import { imgUrlRegEx, validateTextRegEx } from '@/utils/regEx';

type Props = StackScreenProps<MainStackParamList, PATHS.VIEW_NEWS>;

const ViewNewsScreen: FC<Props> = ({ route }) => {
  const [{ loading, getDocumentById }] = useFirebaseDoc({ path: NEWS });

  const [currNews, setCurrNews] = useState<Results | null>(null);

  useEffect(() => {
    const getDoc = async () => {
      const data = await getDocumentById(route.params.documentId);
      setCurrNews(data);
    };

    getDoc();
  }, [route.params.documentId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaScrollViewContainer
      safeBottom={false}
      showsVerticalScrollIndicator={false}
    >
      <Layout variant='column'>
        <View style={styles.imgWrap}>
          {currNews?.imgUrl &&
          (imgUrlRegEx(currNews?.imgUrl) ||
            validateTextRegEx(currNews?.imgUrl)) ? (
            <Image source={{ uri: currNews.imgUrl }} style={styles.img} />
          ) : (
            <Typography fontWeight='bold' style={{ textAlign: 'center' }}>
              No image available
            </Typography>
          )}
        </View>
        <View style={styles.container}>
          <Layout variant='content'>
            <View style={{ marginBottom: 16 }}>
              <Typography color='gray' fontSize='xs' fontWeight='extraLight'>
                {getDateFromNow(toDate(currNews?.createdAt))}
              </Typography>
            </View>
            <View>
              <Typography fontSize='sm' fontWeight='light'>
                {currNews?.message}
              </Typography>
            </View>
          </Layout>
        </View>
      </Layout>
    </SafeAreaScrollViewContainer>
  );
};

export default ViewNewsScreen;

const styles = StyleSheet.create({
  container: {
    top: -50,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: theme.colors.gray99,
    padding: 10,
  },
  imgWrap: {
    height: 350,
    justifyContent: 'center',
  },
  img: {
    flex: 1,
  },
});
