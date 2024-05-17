import React, { FC } from 'react';

import { PressableProps, Pressable, StyleSheet, View } from 'react-native';

import LoadingSpinner from '@/components/LoadingSpinner';
import Typography from '@/components/elements/Typography';
import { theme } from '@/theme';

type Variants = 'primary' | 'error';

interface IButtonProps extends PressableProps {
  label: string;
  variant?: Variants;
  loading?: boolean;
}

const Button: FC<IButtonProps> = ({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
  loading = false,
  ...props
}): JSX.Element => (
  <Pressable disabled={disabled} onPress={onPress} {...props}>
    {({ pressed }) => (
      <View
        style={[
          styles({ pressed, variant }).inner,
          {
            backgroundColor: disabled
              ? theme.colors.lightBlue
              : theme.colors.blue,
          },
        ]}
      >
        {loading ? (
          <LoadingSpinner color={theme.colors.white} inline size='small' />
        ) : (
          <Typography
            color='white'
            fontSize='xl'
            fontWeight='bold'
            style={{ textTransform: 'uppercase' }}
          >
            {label}
          </Typography>
        )}
      </View>
    )}
  </Pressable>
);

export default Button;

const styles = ({
  pressed,
  variant,
}: {
  pressed?: boolean;
  variant?: Variants;
}) =>
  StyleSheet.create({
    inner: {
      backgroundColor:
        variant === 'error' ? theme.colors.red : theme.colors.blue,
      borderRadius: 10,
      height: 63,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: pressed ? 0.3 : 1,
    },
  });
