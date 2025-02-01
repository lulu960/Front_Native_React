// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import SwipeScreen from './screens/swipeScreen';
import Matchs from './screens/matchScreen';
import Profile from './screens/profileScreen';
import Messages from './screens/messageScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="swipe" component={SwipeScreen} />
      <Stack.Screen name="matchs" component={Matchs} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="messages" component={Messages} />
    </Stack.Navigator>
  );
}
