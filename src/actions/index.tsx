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

export const startLoad = () => {
  return {
    type: types.START_LOAD,
  };
};

export const finishLoad = () => {
  return {
    type: types.FINISH_LOAD,
  };
};