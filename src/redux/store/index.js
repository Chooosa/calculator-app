import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { createLogger } = require('redux-logger');

  middlewares.push(createLogger({
    collapsed: true,
  }));
}

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
  whitelist: ['settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);

if (module.hot) {
  module.hot.accept('../reducers', () => {
    // eslint-disable-next-line global-require
    const reducers = require('../reducers');
    store.replaceReducer(combineReducers(reducers));
  });
}

export const persistor = persistStore(store);
