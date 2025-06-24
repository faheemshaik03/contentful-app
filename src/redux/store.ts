import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './layoutSlice';
import { autosaveMiddleware } from './autosaveMiddleware';
import { AppExtensionSDK } from '@contentful/app-sdk';

export const createStore = (sdk: AppExtensionSDK) =>
  configureStore({
    reducer: {
      layout: layoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(autosaveMiddleware(sdk)),
  });

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
