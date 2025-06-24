import { Middleware } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { AppExtensionSDK } from '@contentful/app-sdk';

export const autosaveMiddleware = (sdk: AppExtensionSDK): Middleware => {
  const debouncedSave = debounce((state) => {
    sdk.entry.fields.layoutConfig.setValue(state.layout.blocks);
  }, 1000);

  return (storeAPI) => (next) => (action) => {
    const result = next(action);
    const state = storeAPI.getState();
    debouncedSave(state);
    return result;
  };
};
