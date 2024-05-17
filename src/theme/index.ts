export const theme = {
  fontFamily: {
    extraLight: 'Roboto-Thin',
    light: 'Roboto-Light',
    regular: 'Roboto-Regular',
    medium: 'Rotobo-Medium',
    bold: 'Roboto-Bold',
  },
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    lightGray: '#A4A9AE26',
    extraLightGray: '#f1f2f3',
    gray: '#8E949A',
    red: '#FF6363',
    blue: '#456EFE',
    lightBlue: '#456EFE4D',
  },
  fontSizes: {
    xs: 12,
    sm: 16,
    md: 17,
    lg: 20,
    xl: 24,
  },
} as const;

export type MyTheme = typeof theme;
export type Colors = keyof MyTheme['colors'];
export type FontFamily = keyof MyTheme['fontFamily'];
export type FontSize = keyof MyTheme['fontSizes'];
