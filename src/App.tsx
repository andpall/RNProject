import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

import Navigation from './navigator';
import {configureStore} from './store/store';

const {store, persistor} = configureStore();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
