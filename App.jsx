import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './Layout';
import { persistor, store } from './src/redux/store/index';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={null}
      >
        <Layout />
      </PersistGate>
    </Provider>
  );
}

export default App;
