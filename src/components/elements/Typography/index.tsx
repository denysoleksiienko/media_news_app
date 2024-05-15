import { FC } from 'react';
import type { PropsWithChildren } from 'react';

import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { Colors, FontFamily, FontSize, theme } from '@/theme';
import { scale } from '@/utils';

interface ITypography extends TextProps {
  fontWeight?: FontFamily;
  color?: Colors;
  fontSize?: FontSize;
  style?: TextStyle;
}

const Typography: FC<PropsWithChildren<ITypography>> = ({
  children,
  color = 'black',
  fontSize = 'md',
  fontWeight = 'regular',
  style,
  ...props
}) => (
  <Text
    style={[styles({ color, fontSize, fontWeight }).default, { ...style }]}
    {...props}
  >
    {children}
  </Text>
);

export default Typography;

const styles = ({
  color,
  fontSize,
  fontWeight,
}: {
  fontWeight: FontFamily;
  color: Colors;
  fontSize: FontSize;
}) =>
  StyleSheet.create({
    default: {
      color: theme.colors[color],
      fontSize: scale(theme.fontSizes[fontSize]),
      fontFamily: theme.fontFamily[fontWeight],
    },
  });
