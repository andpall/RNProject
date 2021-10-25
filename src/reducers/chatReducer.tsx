import * as types from '../constants/actionTypes';

let initialState = {
  isLoading: true,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_LOAD: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.FINISH_LOAD: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default chatReducer;
