import * as types from '../constants/actionTypes';

let initialState = {
  isSignIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state,
        isSignIn: true,
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        isSignIn: false,
      };
    }
    case types.LOGIN_WITH_PHONE: {
      return {
        ...state,
        isSignIn: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default authReducer;
