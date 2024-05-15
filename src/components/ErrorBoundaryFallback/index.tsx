import { FC } from 'react';

import { FallbackProps } from 'react-error-boundary';
import { Button, SafeAreaView, View } from 'react-native';

import Typography from '@/components/elements/Typography';

const ErrorBoundaryFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <SafeAreaView style={{ flexGrow: 1 }}>
    <View style={{ paddingHorizontal: 16 }}>
      <Typography style={{ marginVertical: 16 }}>
        Something went wrong:
      </Typography>
      <Typography color='red' style={{ marginVertical: 16 }}>
        {error.message}
      </Typography>
      <Typography style={{ marginVertical: 16 }}>
        An error occured. Please restart your application
      </Typography>
      <Button onPress={resetErrorBoundary} title='Restart' />
    </View>
  </SafeAreaView>
);

export default ErrorBoundaryFallback;
