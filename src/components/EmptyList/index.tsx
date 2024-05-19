import React, { FC, ReactNode } from 'react';

import { StyleSheet, View } from 'react-native';

import EmptyIcon from '@/assets/icons/EmptyIcon.svg';
import { Typography } from '@/components/elements';

const EmptyList: FC<{
  title?: string;
  renderIcon?: () => ReactNode;
}> = ({ title = 'No results found', renderIcon }) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      {renderIcon ? renderIcon() : <EmptyIcon height={100} width={100} />}
    </View>
    <View style={styles.textContainer}>
      <Typography>{title}</Typography>
    </View>
  </View>
);

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  textContainer: {
    paddingBottom: 40,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
