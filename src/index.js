import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
// import reducer from './reducers/ticket-list-reducer.js';
import rootReducer from './reducers/index.js';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/App.js';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState())
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
