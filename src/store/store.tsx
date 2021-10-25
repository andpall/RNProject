import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../reducers/authReducer';
import chatReducer from '../reducers/chatReducer';

export const configureStore = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
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
