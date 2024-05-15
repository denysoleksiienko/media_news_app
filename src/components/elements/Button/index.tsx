import React, { FC } from 'react';

import { ButtonProps, Pressable, StyleSheet, View } from 'react-native';

import LoadingSpinner from '@/components/LoadingSpinner';
import Typography from '@/components/elements/Typography';
import { theme } from '@/theme';

type Variants = 'primary' | 'error';

interface IButtonProps extends ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variants;
  disabled?: boolean;
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
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={styles({ variant }).inner}
    {...props}
  >
    {({ pressed }) => (
      <View style={styles({ pressed }).inner}>
        {loading ? (
          <LoadingSpinner color={theme.colors.white} inline size='small' />
        ) : (
          <Typography fontSize='xl' fontWeight='bold'>
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
    pressed: {
      backgroundColor:
        variant === 'error' ? theme.colors.red : theme.colors.blue,
    },
    inner: {
      backgroundColor: pressed ? theme.colors.lightBlue : theme.colors.blue,
    },
  });
