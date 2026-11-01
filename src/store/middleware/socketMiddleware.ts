import io from 'socket.io-client';
import type { Middleware } from '@reduxjs/toolkit';
import { constants } from '../../constants';
import { actionConnected, actionDisconnected, actionSetMessageHistory } from '../socketSlice/socket.slice';
import type { ISnackbarState } from '../snackbarSlice/snackbarSlice.slice.types';
import { actionShowSnackbar } from '../snackbarSlice/snackbarSlice.slice';
import type { IMessage } from '../socketSlice/socket.slice.types';
import { arrayBufferToBase64 } from '../../utils/bufferUtils';

let socket = null;
const SERVER_URL = 'http://localhost:5000';

export const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === `${constants.reduxSlice.user}/setUser`) {
    if (socket) return next(action);

    const user = store.getState().user.user;

    socket = io(SERVER_URL, {
      maxHttpBufferSize: 10e6, // 10mb
    });

    socket.on('connect', () => {
      console.log('Подключение к сокету');
      store.dispatch(actionConnected(socket.id));
    });

    socket.on('disconnect', () => {
      console.log('Отключение от сокета');
      store.dispatch(actionDisconnected());
    });

    socket.on('message', (data: IMessage) => {
      if (data) {
        store.dispatch(actionSetMessageHistory(data));

        if (data.user.id !== user.id) {
          const snackbarData: ISnackbarState = {
            message: 'Пришло новое сообщение',
            severity: 'success',
          };

          store.dispatch(actionShowSnackbar(snackbarData));
        }
      }
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });
  }

  // Реагируем на логаут
  if (action.type === `${constants.reduxSlice.user}/logout`) {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }

  // Обработка отправки сообщений через сокет
  if (action.type === constants.reduxAction.socket.sendMessage) {
    if (socket && socket.connected) {
      socket.emit('message', action.payload);
    } else {
      console.warn('Socket not connected, message not sent');
    }
  }

  return result;
};
