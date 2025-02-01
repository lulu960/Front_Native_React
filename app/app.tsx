// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import SwipeScreen from './screens/swipeScreen';
import Matchs from './screens/matchScreen';
import Profile from './screens/profileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Swipe" component={SwipeScreen} />
      <Stack.Screen name="Matchs" component={Matchs} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
