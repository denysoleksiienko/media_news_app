import React, { FC } from 'react';

import { PressableProps, Pressable, StyleSheet, View } from 'react-native';

import LoadingSpinner from '@/components/LoadingSpinner';
import { theme } from '@/theme';

interface IButtonIconProps extends PressableProps {
  icon: React.ReactNode | JSX.Element;
  loading?: boolean;
}

const ButtonIcon: FC<IButtonIconProps> = ({
  icon,
  onPress,
  disabled = false,
  loading = false,
  ...props
}): JSX.Element => (
  <Pressable disabled={disabled} onPress={onPress} {...props}>
    {({ pressed }) => (
      <View style={styles({ pressed }).inner}>
        {loading ? (
          <LoadingSpinner color={theme.colors.white} inline size='small' />
        ) : (
          <View>{icon}</View>
        )}
      </View>
    )}
  </Pressable>
);

export default ButtonIcon;

const styles = ({ pressed }: { pressed?: boolean }) =>
  StyleSheet.create({
    inner: {
      backgroundColor: theme.colors.lightGray,
      borderRadius: 23.5,
      height: 48,
      width: 48,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: pressed ? 0.3 : 1,
    },
  });
