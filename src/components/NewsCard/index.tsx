import React, { FC } from 'react';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/theme';
import { Results } from '@/types/firestore';
import { getDateFromNow, toDate } from '@/utils/js-utils';
import { imgUrlRegEx, validateTextRegEx } from '@/utils/regEx';

import { Typography } from '../elements';

interface INewsCard extends Results {
  onPress: () => void;
}

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
      {imgUrl && (imgUrlRegEx(imgUrl) || validateTextRegEx(imgUrl)) ? (
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
