import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import App from './App';
import "./App.css";
import { Provider } from 'react-redux';
import store from './Store';
import {positions,transitions,Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic"


const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>
  </Router>
);