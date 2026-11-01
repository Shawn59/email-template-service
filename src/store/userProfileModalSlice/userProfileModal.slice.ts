import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { constants } from '../../constants';
import type { IUserProfileModalState } from './userProfileModal.slice.types';

const initialState: IUserProfileModalState = {
  isOpen: false,
  userData: null,
};

const userProfileModalSlice = createSlice({
  name: constants.reduxSlice.userProfileModal,
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IUserProfileModalState['userData']>) => {
      state.isOpen = true;
      state.userData = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    clearModal: (state) => {
      state.userData = null;
    },
  },
});

export default userProfileModalSlice.reducer;
export const actionOpenModal = userProfileModalSlice.actions.openModal;
export const actionCloseModal = userProfileModalSlice.actions.closeModal;
export const actionClearModal = userProfileModalSlice.actions.clearModal;
