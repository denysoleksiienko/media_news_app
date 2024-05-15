import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

import Typography from '@/components/elements/Typography';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={backgroundStyle.backgroundColor}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={backgroundStyle}
      >
        <Header />

        <Typography fontSize='xl' fontWeight='bold'>
          Hello
        </Typography>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
