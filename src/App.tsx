import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from './redux/store';
import { AppExtensionSDK, init, locations } from '@contentful/app-sdk';

import AppUI from './AppUI';  // Import your drag-drop UI

function App() {
  const [sdk, setSdk] = useState<AppExtensionSDK | null>(null);
  const [store, setStore] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let initialized = false;

    init((sdkInstance) => {
      initialized = true;
      if (sdkInstance.location.is(locations.LOCATION_ENTRY_FULLSCREEN)) {
        setSdk(sdkInstance);
        const storeInstance = createStore(sdkInstance);
        setStore(storeInstance);

        const saved = sdkInstance.entry.fields.layoutConfig?.getValue();
        if (saved && Array.isArray(saved)) {
          storeInstance.dispatch({ type: 'layout/setBlocks', payload: saved });
        }
      } else {
        setError('Not running inside Contentful entry fullscreen location');
      }
    });

    setTimeout(() => {
      if (!initialized) {
        console.warn('SDK init did not run, using mock SDK for local dev');

        const mockSdk = {
          entry: {
            fields: {
              layoutConfig: {
                getValue: () => [],
                set: (blocks: any) => console.log('Mock set blocks:', blocks),
              },
            },
          },
          location: {
            is: (loc: string) => loc === locations.LOCATION_ENTRY_FULLSCREEN,
          },
        } as unknown as AppExtensionSDK;

        setSdk(mockSdk);
        const storeInstance = createStore(mockSdk);
        setStore(storeInstance);
      }
    }, 2000);
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!store) return <div>Loading Contentful App...</div>;

  return (
    <Provider store={store}>
      <AppUI />
    </Provider>
  );
}

export default App;
