import userTypes from '../types/userTypes';

// Session State
export const getSessionState = ({ user }) => user.isSessionActive;
export const changeSessionState = (isActive) => ({
  type: userTypes.CHANGE_STATE,
  payload: isActive,
});

// Username State
export const getUsername = ({ user }) => user.username;
export const changeUsername = (username) => ({
  type: userTypes.CHANGE_USER_NAME,
  payload: username,
});

// Email State
export const getEmail = ({ user }) => user.email;
export const changeEmail = (email) => ({
  type: userTypes.CHANGE_EMAIL,
  payload: email,
});

// Password State
export const getPassword = ({ user }) => user.password;
export const changePassword = (password) => ({
  type: userTypes.CHANGE_PASS,
  payload: password,
});
