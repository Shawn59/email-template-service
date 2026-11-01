import type { Middleware } from '@reduxjs/toolkit';
import { constants } from '../../constants';

export const userStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith(`${constants.reduxSlice.user}/`)) {
    const state = store.getState().user.user;

    if (state) {
      localStorage.setItem(constants.localStorage.USER_INFO, JSON.stringify(state));
    } else {
      localStorage.removeItem(constants.localStorage.USER_INFO);
    }
  }

  return result;
};
