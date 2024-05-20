import { FC } from 'react';

import { View, StyleSheet, ViewStyle } from 'react-native';

import { theme } from '@/theme';

const Divider: FC<{
  width?: number;
  style?: ViewStyle;
}> = ({ width, style }) => (
  <View
    style={{
      alignItems: 'center',
      ...style,
    }}
  >
    <View style={styles(width).lineOuterWrapper}>
      <View style={styles().inner} />
    </View>
  </View>
);

export default Divider;

const styles = (width?: number) =>
  StyleSheet.create({
    lineOuterWrapper: {
      overflow: 'hidden',
      height: 5,
      borderRadius: 5,
      width: width ?? 35,
    },
    inner: {
      flex: 1,
      borderStyle: 'solid',
      borderWidth: 5,
      borderColor: theme.colors.gray,
    },
  });
