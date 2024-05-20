import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import ArrowIcon from '@/assets/icons/ArrowIcon.svg';
import { ButtonIcon, Typography } from '@/components/elements';
import { PATHS } from '@/constants';
import { MainStackParamList } from '@/navigation/params';
import {
  NewsListScreen,
  AddNewsScreen,
  ViewNewsScreen,
  ModalScreen,
} from '@/screens';
import { theme } from '@/theme';

const Stack = createStackNavigator<MainStackParamList>();

const MainRouter: FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShadowVisible: false,
        cardStyle: { backgroundColor: theme.colors.white },
        headerLeft: ({ canGoBack, onPress }) =>
          canGoBack && (
            <View style={{ marginLeft: 16 }}>
              <ButtonIcon icon={<ArrowIcon />} onPress={onPress} />
            </View>
          ),
        headerTitleStyle: {
          fontSize: theme.fontSizes.lg,
          fontFamily: theme.fontFamily.bold,
        },
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
          headerTitle: 'New post',
        }}
      />
      <Stack.Screen
        component={ViewNewsScreen}
        name={PATHS.VIEW_NEWS}
        options={({ route }) => ({
          headerTitle: () => (
            <Typography fontSize='lg' fontWeight='bold' numberOfLines={1}>
              {route.params.title}
            </Typography>
          ),
        })}
      />
      <Stack.Screen
        component={ModalScreen}
        name={PATHS.MODAL}
        options={{
          headerShown: false,
          gestureResponseDistance: 1000,
          cardStyle: {
            opacity: 1,
            backgroundColor: 'transparent',
          },
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainRouter;
