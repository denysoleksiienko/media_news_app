import { FC } from 'react';
import type { PropsWithChildren } from 'react';

import { View, ViewStyle } from 'react-native';
import {
  Edge,
  SafeAreaView as DefaultSafeAreaView,
} from 'react-native-safe-area-context';

import {
  AwareScrollView,
  AwareScrollViewProps,
} from '@/components/AwareScrollView';
import { theme, Colors } from '@/theme';
import { moderateScale } from '@/utils';

type SafeAreaViewProps = {
  safeTop?: boolean;
  safeBottom?: boolean;
  backgroundColor?: Colors;
};

type SafeAreaAwareScrollViewProps = SafeAreaViewProps & AwareScrollViewProps;

const SafeAreaView: FC<PropsWithChildren<SafeAreaViewProps>> = ({
  safeTop,
  safeBottom = true,
  children,
}) => {
  const edges: Edge[] = [];

  if (safeBottom) {
    edges.push('bottom');
  }

  if (safeTop) {
    edges.push('top');
  }

  return (
    <DefaultSafeAreaView edges={edges} style={{ flex: 1 }}>
      {children}
    </DefaultSafeAreaView>
  );
};

export const SafeAreaViewContainer: FC<
  PropsWithChildren<SafeAreaViewProps & { style?: ViewStyle }>
> = ({
  children,
  safeTop,
  safeBottom = true,
  backgroundColor = 'white',
  style,
  ...props
}) => (
  <View
    style={[
      {
        flex: 1,
        backgroundColor: theme.colors[backgroundColor],
      },
      style,
    ]}
    {...props}
  >
    <SafeAreaView safeBottom={safeBottom} safeTop={safeTop}>
      {children}
    </SafeAreaView>
  </View>
);

export const KeyboardAwareScrollViewContainer: FC<
  PropsWithChildren<SafeAreaAwareScrollViewProps>
> = ({
  children,
  safeTop,
  safeBottom,
  backgroundColor = 'white',
  contentContainerStyle,
  ...props
}) => (
  <AwareScrollView
    contentContainerStyle={[
      {
        flexGrow: 1,
        backgroundColor: theme.colors[backgroundColor],
        paddingHorizontal: moderateScale(16),
      },
      contentContainerStyle,
    ]}
    {...props}
  >
    <SafeAreaView safeBottom={safeBottom} safeTop={safeTop}>
      {children}
    </SafeAreaView>
  </AwareScrollView>
);
