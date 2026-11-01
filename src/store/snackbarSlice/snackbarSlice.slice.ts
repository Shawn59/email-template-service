import { createSlice } from '@reduxjs/toolkit';
import type { ISnackbarState } from './snackbarSlice.slice.types';
import type { PayloadAction } from '@reduxjs/toolkit/dist';
import uuid from 'react-uuid';
import { constants } from '../../constants';

const initialState: ISnackbarState = {
  id: '',
  open: false,
  message: '',
  severity: 'info',
  duration: 3000,
};

const snackbarSlice = createSlice({
  name: constants.reduxSlice.snackbar,
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<Omit<ISnackbarState, 'open' | 'id'>>) => {
      const { message, severity = initialState.severity, duration = initialState.duration } = action.payload;

      state.id = uuid();
      state.open = true;
      state.message = message;
      state.severity = severity;
      state.duration = duration;
    },

    hideSnackbar: (state) => {
      state.id = '';
      state.open = false;
      state.message = '';
    },
  },
});

export const actionShowSnackbar = snackbarSlice.actions.showSnackbar;
export const actionHideSnackbar = snackbarSlice.actions.hideSnackbar;
export default snackbarSlice.reducer;
