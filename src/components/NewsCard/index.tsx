import React, { FC } from 'react';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/theme';
import { getDateFromNow, toDate } from '@/utils/js-utils';

import { Typography } from '../elements';

interface INewsCard {
  imgUrl?: string;
  title: string;
  message: string;
  createdAt: string;
  link?: string;
  onPress: () => void;
}

const imgUrlRegEx = (url: string) => url.match(/\.(jpeg|jpg|gif|png)$/);
const validateText = (url: string) => /(http(s?)):\/\//i.test(url);

const NewsCard: FC<INewsCard> = ({
  imgUrl,
  title,
  message,
  createdAt,
  onPress,
  ...props
}) => (
  <Pressable onPress={onPress} style={styles.container} {...props}>
    <View style={styles.imgWrap}>
      {imgUrl && (imgUrlRegEx(imgUrl) || validateText(imgUrl)) ? (
        <Image source={{ uri: imgUrl }} style={styles.img} />
      ) : (
        <Typography fontWeight='bold' style={{ textAlign: 'center' }}>
          No image available
        </Typography>
      )}
    </View>
    <View style={styles.messWrap}>
      <View style={{ marginBottom: 6 }}>
        <Typography fontSize='lg' fontWeight='medium'>
          {title}
        </Typography>
      </View>
      <View style={{ marginBottom: 6 }}>
        <Typography fontSize='sm' fontWeight='light' numberOfLines={1}>
          {message}
        </Typography>
      </View>
      <View>
        <Typography color='gray' fontSize='xs' fontWeight='extraLight'>
          {getDateFromNow(toDate(createdAt))}
        </Typography>
      </View>
    </View>
  </Pressable>
);

export default NewsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  imgWrap: {
    height: 195,
    justifyContent: 'center',
  },
  img: {
    flex: 1,
    height: 195,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  messWrap: {
    padding: 20,
  },
});
