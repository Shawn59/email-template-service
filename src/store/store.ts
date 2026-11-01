import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/user.slice';
import userProfileReducer from './userProfileModalSlice/userProfileModal.slice';
import snackbarReducer from './snackbarSlice/snackbarSlice.slice';
import { userStorageMiddleware } from './middleware/userStorageMiddleware';
import { socketMiddleware } from './middleware/socketMiddleware';
import socketSlice from './socketSlice/socket.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userProfile: userProfileReducer,
    snackbar: snackbarReducer,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware).concat(userStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
