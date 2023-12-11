import { Middleware } from "redux";

type WebSocketActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsInitUserOrder: string;
};


export const socketMiddleware = (wsUrl: string, wsActions: WebSocketActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { user } = getState().user;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsInitUserOrder } = wsActions;
      const accessToken = localStorage.accessToken && localStorage.accessToken.slice(7);

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`)
      };

      if (type === wsInitUserOrder && user) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
};