import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { devToolsEnhancer } from '@redux-devtools/extension';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import contactsSlice from 'redux/contactsSlice';
import filterSlice from 'redux/filterSlice';

const enhancer = devToolsEnhancer();

const rootReducer = combineReducers({
  contacts: contactsSlice,
  filter: filterSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  },
  enhancer
);

export const persistor = persistStore(store);
export default store;
