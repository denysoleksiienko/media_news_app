import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import ArrowIcon from '@/assets/icons/ArrowIcon.svg';
import { ButtonIcon } from '@/components/elements';
import { PATHS } from '@/constants';
import { MainStackParamList } from '@/navigation/params';
import { NewsListScreen, AddNewsScreen } from '@/screens';
import { theme } from '@/theme';

const Stack = createStackNavigator<MainStackParamList>();

const MainRouter: FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShadowVisible: false,
        cardStyle: { backgroundColor: theme.colors.white },
      }}
    >
      <Stack.Screen
        component={NewsListScreen}
        name={PATHS.NEWS}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AddNewsScreen}
        name={PATHS.ADD_NEWS}
        options={{
          headerLeft: ({ onPress }) => (
            <View style={{ marginLeft: 16 }}>
              <ButtonIcon icon={<ArrowIcon />} onPress={onPress} />
            </View>
          ),
          headerTitle: 'New post',
          headerTitleStyle: {
            fontSize: theme.fontSizes.lg,
            fontFamily: theme.fontFamily.medium,
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainRouter;
