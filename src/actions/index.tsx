import * as types from '../constants/actionTypes';

export const signIn = () => {
  return {
    type: types.LOGIN,
  };
};

export const signOut = () => {
  return {
    type: types.LOGOUT,
  };
};

export const signInWithPhone = () => {
  return {
    type: types.LOGIN_WITH_PHONE,
  };
};

export const setUsername = (data: {}) => ({
  type: types.SET_USERNAME,
  payload: data,
});
