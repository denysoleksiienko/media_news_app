import React, { FC } from 'react';

import { ScrollViewProps, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export type AwareScrollViewProps = {
  /** The distance between keyboard and focused `TextInput` when keyboard is shown. Default is `0`. */
  bottomOffset?: number | undefined;
  /** Prevents automatic scrolling of the `ScrollView` when the keyboard gets hidden, maintaining the current screen position. Default is `false`. */
  disableScrollOnKeyboardHide?: boolean | undefined;
  /** Controls whether this `KeyboardAwareScrollView` instance should take effect. Default is `true` */
  enabled?: boolean | undefined;
} & ScrollViewProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<ScrollView>;

export const AwareScrollView: FC<AwareScrollViewProps> = ({
  bottomOffset = 14,
  ...props
}) => (
  <KeyboardAwareScrollView
    bottomOffset={bottomOffset}
    keyboardDismissMode='on-drag'
    keyboardShouldPersistTaps='handled'
    testID='aware_scroll_view_container'
    {...props}
  />
);
