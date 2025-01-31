import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'; // Importer Provider
import store from '../redux/store'; // Importer le store Redux
import App from './app'; // Ton composant avec les routes

export default function Index() {
  return (
    // Envelopper l'application avec le Provider de Redux
    <Provider store={store}>
        <App/>
    </Provider>
  );
}
