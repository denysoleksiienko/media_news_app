import { ErrorBoundary } from 'react-error-boundary';
import { useColorScheme, StatusBar, LogBox } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import MainRouter from '@/navigation/MainRoute';
import { GlobalProvider } from '@/providers/GlobalProvider';

LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <KeyboardProvider statusBarTranslucent>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <GlobalProvider>
          <MainRouter />
        </GlobalProvider>
      </KeyboardProvider>
    </ErrorBoundary>
  );
}

export default App;
