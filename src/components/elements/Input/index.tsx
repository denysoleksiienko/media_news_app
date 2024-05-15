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
}

const Input: FC = forwardRef<TextInput, IInputProps>(
  ({ containerStyle, ...props }, ref) => (
    <View style={containerStyle}>
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.gray}
        style={styles.input}
        {...props}
      />
    </View>
  )
);

export default Input;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    color: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    fontSize: scale(17),
    fontFamily: theme.fontFamily.regular,
    height: verticalScale(60),
    justifyContent: 'center',
  },
});
