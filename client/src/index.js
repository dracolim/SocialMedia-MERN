import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import {
  persistStore,
  persisteReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage'; // user info will be saved in local storage, unless they clear their cache
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: "root" , storage , version:1};
const persistReducer = persisteReducer(persistConfig , authReducer);
const store = configureStore ({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware ({
      serializableCheck: {
        ignoredActions: [FLUSH , REHYDRATE, PAUSE,PERSIST,PURGE,REGISTER],
      },
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading = {null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

