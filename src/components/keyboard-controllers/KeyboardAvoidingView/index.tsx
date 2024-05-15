import React, { FC, useMemo } from 'react';

import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import type { ViewProps } from 'react-native';
import {
  KeyboardAvoidingView as DefaultKeyboardAvoidingView,
  KeyboardController,
} from 'react-native-keyboard-controller';

export type KeyboardAvoidingViewProps = {
  /**
   * Which to use KeyboardAvoidingView - from the package or standard RN.
   */
  isPackageImplementation?: 'Package' | 'RN';
  /**
   * Specify how to react to the presence of the keyboard.
   */
  behavior?: 'height' | 'padding' | 'position' | undefined;
  /**
   * Style of the content container when `behavior` is 'position'.
   */
  contentContainerStyle?: ViewProps['style'];
  /**
   * Controls whether this `KeyboardAvoidingView` instance should take effect.
   * This is useful when more than one is on the screen. Defaults to true.
   */
  enabled?: boolean | undefined;
  /**
   * Distance between the top of the user screen and the React Native view. This
   * may be non-zero in some cases. Defaults to 0.
   */
  keyboardVerticalOffset?: number | undefined;
} & ViewProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<View>;

export const KeyboardAvoidingView: FC<KeyboardAvoidingViewProps> = ({
  isPackageImplementation = 'Package',
  behavior = 'height',
  contentContainerStyle,
  keyboardVerticalOffset = 0,
  style,
  ...props
}) => {
  const Container = useMemo(
    () =>
      isPackageImplementation === 'Package'
        ? DefaultKeyboardAvoidingView
        : RNKeyboardAvoidingView,
    [isPackageImplementation]
  );

  return (
    <TouchableWithoutFeedback onPress={() => KeyboardController.dismiss()}>
      <Container
        behavior={behavior}
        contentContainerStyle={contentContainerStyle}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[{ flex: 1 }, style]}
        {...props}
      />
    </TouchableWithoutFeedback>
  );
};
