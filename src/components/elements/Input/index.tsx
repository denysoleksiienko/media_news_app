import { FC, forwardRef } from 'react';

import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '@/theme';
import { scale, verticalScale } from '@/utils';

interface IInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  size?: 'md' | 'lg';
}

const Input: FC<IInputProps> = forwardRef<TextInput, IInputProps>(
  ({ containerStyle, size = 'md', style, ...props }, ref) => (
    <View style={containerStyle}>
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.gray}
        style={[{ ...styles({ size }).input }, style]}
        {...props}
      />
    </View>
  )
);

export default Input;

const styles = ({ size }: { size: 'md' | 'lg' }) =>
  StyleSheet.create({
    input: {
      width: '100%',
      color: theme.colors.black,
      backgroundColor: theme.colors.lightGray,
      fontSize: scale(17),
      fontFamily: theme.fontFamily.regular,
      height: size === 'md' ? verticalScale(48) : verticalScale(60),
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderRadius: 10,
    },
  });
