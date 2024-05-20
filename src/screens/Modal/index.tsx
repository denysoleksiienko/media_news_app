import React, { FC, useCallback } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';

import { Layout } from '@/components/Layout';
import { Button, Divider } from '@/components/elements';
import { PATHS } from '@/constants';
import { NEWS } from '@/constants/collections';
import { useFirebaseDoc } from '@/hooks/useFirebaseDoc';
import { MainStackParamList } from '@/navigation/params';
import { useGlobalContext } from '@/providers/GlobalProvider';
import { theme } from '@/theme';

type Props = StackScreenProps<MainStackParamList, PATHS.MODAL>;

const Modal: FC<Props> = ({ route, navigation }) => {
  const { onRefresh } = useGlobalContext();

  const { documentId } = route.params;

  const [{ loading, deleteDocument }] = useFirebaseDoc({
    path: NEWS,
    docId: documentId,
  });

  const handleDelete = useCallback(async () => {
    await deleteDocument();
    onRefresh();

    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Layout
        style={{
          height: '30%',
          width: '100%',
          backgroundColor: theme.colors.white,
          justifyContent: 'center',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}
        variant='content'
      >
        <Divider style={{ bottom: 30 }} />

        <Button
          disabled={loading}
          label='DELETE'
          loading={loading}
          onPress={handleDelete}
          style={{ marginBottom: 16 }}
          variant='error'
        />
        <Button label='CLOSE' onPress={() => navigation.goBack()} />
      </Layout>
    </View>
  );
};

export default Modal;
