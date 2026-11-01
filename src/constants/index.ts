export const constants = {
  localStorage: {
    USER_INFO: 'userInfo',
  },

  reduxSlice: {
    user: 'user',
    userProfileModal: 'userProfileModal',
    snackbar: 'snackbar',
    socket: 'socket',
  },

  reduxAction: {
    socket: {
      sendMessage: 'socket/sendMessage',
    },
  },

  file: {
    mimeTypeAccept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },

    mimeTypeImages: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
  },
};
