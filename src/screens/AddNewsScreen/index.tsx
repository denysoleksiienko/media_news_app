import React, { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Layout } from '@/components/Layout';
import { KeyboardAwareScrollViewContainer } from '@/components/containers';
import { Button, Input, Typography } from '@/components/elements';
import { NEWS } from '@/firebase/collections';
import { useDocument } from '@/hooks/useFirebaseDoc';
import { useTextError } from '@/hooks/useTextError';
import { useGlobalContext } from '@/providers/GlobalProvider';

import { AddNewsForm, AddNewsSchema } from './types';

const AddNewsScreen: FC = () => {
  const { goBack } = useNavigation();
  const { onRefresh } = useGlobalContext();
  const { bottom } = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<AddNewsForm>({ resolver: zodResolver(AddNewsSchema) });

  const { error, resetError, setError } = useTextError();

  const [{ loading, createDocument }] = useDocument({ path: NEWS });

  const onSubmit = handleSubmit(
    async ({ title, message, link = '', imgUrl = '' }) => {
      resetError();

      try {
        const doc = {
          title,
          imgUrl,
          message,
          link,
        };

        await createDocument(doc);
        onRefresh();
        goBack();
      } catch (err) {
        setError(err.message);
      }
    }
  );

  return (
    <KeyboardAwareScrollViewContainer bottomOffset={bottom + 60}>
      <Layout
        style={{ flex: 1, justifyContent: 'space-between' }}
        variant='column'
      >
        <View>
          <Layout mb={14}>
            <Controller
              control={control}
              name='title'
              render={({ field: { onChange, ...field } }) => (
                <Input
                  onChangeText={onChange}
                  {...field}
                  placeholder='Title*'
                />
              )}
              rules={{ required: 'Title os required' }}
            />
            {errors && errors.title && (
              <Typography color='red' fontSize='sm'>
                {errors.title.message}
              </Typography>
            )}
          </Layout>
          <Layout mb={14}>
            <Controller
              control={control}
              name='imgUrl'
              render={({ field: { onChange, ...field } }) => (
                <Input
                  onChangeText={onChange}
                  {...field}
                  autoCapitalize='none'
                  placeholder='Image url'
                />
              )}
            />
            {errors && errors.imgUrl && (
              <Typography color='red' fontSize='sm'>
                {errors.imgUrl.message}
              </Typography>
            )}
          </Layout>
          <Layout mb={14}>
            <Controller
              control={control}
              name='link'
              render={({ field: { onChange, ...field } }) => (
                <Input
                  onChangeText={onChange}
                  {...field}
                  autoCapitalize='none'
                  placeholder='Link'
                />
              )}
            />
            {errors && errors.link && (
              <Typography color='red' fontSize='sm'>
                {errors.link.message}
              </Typography>
            )}
          </Layout>
          <Layout mb={14}>
            <Controller
              control={control}
              name='message'
              render={({ field: { onChange, ...field } }) => (
                <Input
                  onChangeText={onChange}
                  {...field}
                  multiline
                  numberOfLines={10}
                  onSubmitEditing={onSubmit}
                  placeholder='Type  your message here..*'
                  returnKeyType='send'
                  style={{ height: 150, padding: 16 }}
                />
              )}
              rules={{ required: 'Message os required' }}
            />
            {errors && errors.message && (
              <Typography color='red' fontSize='sm'>
                {errors.message.message}
              </Typography>
            )}
          </Layout>
        </View>
        <View>
          {error && (
            <Typography color='red' fontSize='sm'>
              {error}
            </Typography>
          )}
          <Button
            disabled={!isValid}
            label='Public'
            loading={loading}
            onPress={onSubmit}
          />
        </View>
      </Layout>
    </KeyboardAwareScrollViewContainer>
  );
};

export default AddNewsScreen;
