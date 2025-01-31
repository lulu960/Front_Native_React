// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
