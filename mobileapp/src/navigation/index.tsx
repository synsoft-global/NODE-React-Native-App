/**
 * @template Navigation Screen
 * Define all navigation stack screen here
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from 'screens/login';
import MovieListScreen from 'screens/moviesList';
import AddEditMovie from 'screens/addEditMovie';
import SplashScreen from 'screens/splash';
import * as Constants from 'utils/constants';

//Stack Navigator
const Stack = createNativeStackNavigator();

const RouteNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Constants.KEY_SPLASH}
        screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen
          name={Constants.KEY_SPLASH}
          component={SplashScreen}
        />
        <Stack.Screen
          name={Constants.KEY_LOGIN}
          component={LoginScreen}
        />
        <Stack.Screen
          name={Constants.KEY_MOVIEW}
          component={MovieListScreen }
        />
        <Stack.Screen
          name={Constants.KEY_AD_EDIT_MOBIE}
          component={AddEditMovie }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
