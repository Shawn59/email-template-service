import { createSlice } from '@reduxjs/toolkit';
import { constants } from '../../constants';
import type { ISocketData } from './socket.slice.types';
import type { PayloadAction } from '@reduxjs/toolkit/dist';
import type { IMessage } from './socket.slice.types';

const initialState: ISocketData = {
  connected: false,
  senderId: '',
  messages: [],
};

const socketSlice = createSlice({
  name: constants.reduxSlice.socket,
  initialState,
  reducers: {
    setMessageHistory: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    connected: (state, action: PayloadAction<ISocketData['senderId']>) => {
      state.connected = true;
      state.senderId = action.payload;
    },
    disconnected: (state) => {
      state.connected = false;
      state.senderId = '';
      state.messages = [];
    },
  },
});

//экнш для отправки сообщения в mdw
export const actionSendMessage = (message) => ({
  type: constants.reduxAction.socket.sendMessage,
  payload: message,
});

export const actionSetMessageHistory = socketSlice.actions.setMessageHistory;
export const actionConnected = socketSlice.actions.connected;
export const actionDisconnected = socketSlice.actions.disconnected;
export default socketSlice.reducer;
