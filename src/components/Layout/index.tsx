import { FC } from 'react';
import type { PropsWithChildren } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

type Variants = 'row' | 'column' | 'content';

interface ILayoutProps extends ViewProps {
  variant?: Variants;
  centered?: boolean;
  fill?: boolean;
  mb?: number;
  mt?: number;
  style?: ViewStyle;
}

export const Layout: FC<PropsWithChildren<ILayoutProps>> = ({
  variant,
  children,
  centered,
  fill,
  mb,
  mt,
  style,
  ...props
}) => (
  <View
    style={{
      flex: fill ? 1 : undefined,
      ...styles({ centered, mt, mb, variant }).container,
      ...style,
    }}
    {...props}
  >
    {children}
  </View>
);

const getVariant = (variant?: Variants) => {
  switch (variant) {
    case 'column':
      return { paddingVertical: 16 };
    case 'row':
      return { paddingHorizontal: 16 };
    case 'content':
      return { padding: 16 };
    default:
      return { padding: 0 };
  }
};

const styles = ({ centered, mb, mt, variant }: ILayoutProps) =>
  StyleSheet.create({
    container: {
      alignItems: centered ? 'center' : undefined,
      justifyContent: centered ? 'center' : undefined,
      marginBottom: mb || undefined,
      marginTop: mt || undefined,
      ...getVariant(variant),
    },
  });
