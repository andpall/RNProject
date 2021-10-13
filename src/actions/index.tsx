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

export const setUsername = (data: {}) => ({
  type: types.SET_USERNAME,
  payload: data,
});
