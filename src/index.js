import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";
import {
  WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
  WS_CONNECTION_START, WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE, WS_INIT_USER_ORDER_START
} from "./services/actions/web-socket";
import { socketMiddleware } from "./services/middleware/socketMiddleware";

const wsUrl = "wss://norma.nomoreparties.space/orders"

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitUserOrder: WS_INIT_USER_ORDER_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk,
  socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
