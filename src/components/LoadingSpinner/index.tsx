import React, { FC } from 'react';

import {
  ActivityIndicator,
  ActivityIndicatorProps,
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface ILoadingProps extends ActivityIndicatorProps {
  spinnerColor?: string;
  inline?: boolean;
  overlay?: boolean;
  message?: string;
  size?: number | 'small' | 'large';
  backgroundColor?: string;
}

const LoadingSpinner: FC<ILoadingProps> = ({
  inline = false,
  overlay = true,
  message = undefined,
  backgroundColor = 'rgba(255, 255, 255, 0.80)',
  spinnerColor = '#000',
  size = 'large',
  ...props
}): JSX.Element => {
  if (inline) {
    return (
      <View style={styles.inlineContainer}>
        <ActivityIndicator
          animating
          color={spinnerColor}
          size={size}
          {...props}
        />
        {message && <Text style={[styles.message]}>{message}</Text>}
      </View>
    );
  }
  return (
    <View
      style={[
        overlay
          ? [styles.overlayContainer, { backgroundColor }]
          : styles.container,
      ]}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          animating
          color={spinnerColor}
          size={size}
          {...props}
        />
        {message && <Text style={[styles.message]}>{message}</Text>}
      </View>
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inlineContainer: {
    position: 'relative',
    width: 30,
    height: 30,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    zIndex: 100,
  },
  message: {
    marginTop: 16,
  },
});
