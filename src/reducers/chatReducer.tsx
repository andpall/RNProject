import {AnyAction} from 'redux';
import * as types from '../constants/actionTypes';

let initialState = {
  isLoading: false,
  chats: [],
  error: false,
  messages: [],
};

const chatReducer = (state = initialState, action: AnyAction) => {
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
    case types.GET_CHATS: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case types.GET_CHATS_SUCCES: {
      return {
        ...state,
        isLoading: false,
        chats: [...action.payload],
        error: false,
      };
    }
    case types.GET_CHATS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        chats: [],
        error: true,
      };
    }
    case types.GET_MESSAGES_SUCCES: {
      return {
        ...state,
        isLoading: false,
        messages: [...action.payload],
        error: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default chatReducer;
