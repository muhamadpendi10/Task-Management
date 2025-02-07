import userTypes from '../types/userTypes';
const initialState = {
  username: '',
  password: '',
  email: '',
  isSessionActive: false,
};
const checkLocalStorage = () => {
  if (localStorage.getItem('user')) {
    const obj = localStorage.getItem('user');
    initialState.username = obj.username;
    initialState.password = obj.password;
    initialState.email = obj.email;
    initialState.isSessionActive = true;
  }
  return initialState;
};
export const userReducer = (state = checkLocalStorage(), action) => {
  if (action.type === userTypes.CHANGE_STATE) {
    return {
      ...state,
      isSessionActive: action.payload,
    };
  } else if (action.type === userTypes.CHANGE_USER_NAME) {
    return {
      ...state,
      username: action.payload,
    };
  } else if (action.type === userTypes.CHANGE_EMAIL) {
    return {
      ...state,
      email: action.payload,
    };
  } else if (action.type === userTypes.CHANGE_PASS) {
    return {
      ...state,
      password: action.payload,
    };
  }
  return state;
};
