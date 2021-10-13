import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../reducers/authReducer';

export const configureStore = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persitedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persitedReducer);
  const persistor = persistStore(store);

  return {store, persistor};
};
