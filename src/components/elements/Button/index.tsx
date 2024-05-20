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
      <View style={[styles({ pressed, variant, disabled }).inner]}>
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

const getButtonBackground = (variant?: Variants, disabled?: boolean | null) => {
  if (disabled) {
    return { backgroundColor: theme.colors.lightBlue };
  }

  if (variant === 'error') {
    return { backgroundColor: theme.colors.red };
  }

  return { backgroundColor: theme.colors.blue };
};

const styles = ({
  pressed,
  variant,
  disabled,
}: {
  pressed?: boolean;
  variant?: Variants;
  disabled?: boolean | null;
}) =>
  StyleSheet.create({
    inner: {
      ...getButtonBackground(variant, disabled),
      borderRadius: 10,
      height: 63,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: pressed ? 0.3 : 1,
    },
  });
