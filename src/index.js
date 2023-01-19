import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const take = document.getElementById('root');
const root = ReactDOM.createRoot(take);
const store = configureStore({ reducer: reducers });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
