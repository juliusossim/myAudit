import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import appStore from './redux/appStore';

import './assets/css/bootstrap.css';
import './assets/css/index.scss';
import App from './App';

import reportWebVitals from './reportWebVitals';

const { store, persistor } = appStore;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div className="p-40"><center>Loading...</center></div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
