import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleWare from 'redux-saga';

import authReducer from '../reducers/authReducer';
import chatReducer from '../reducers/chatReducer';
import rootSaga from '../saga/saga';
import {Conversation, Message} from '../types';

export interface RootState {
  auth: {isSignIn: boolean};
  chat: {
    isLoading: boolean;
    chats: Conversation[];
    messages: Message[];
    error: boolean;
  };
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleWare();

  const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const middlewares = [sagaMiddleware];
  const persitedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persitedReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {store, persistor};
};
