import * as types from '../constants/actionTypes';
import {Conversation, Message} from '../types';

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

export const getChats = () => {
  return {
    type: types.GET_CHATS,
  };
};

export const getChatsSucces = (data: Conversation[]) => {
  return {
    type: types.GET_CHATS_SUCCES,
    payload: data,
  };
};

export const getMessagesSucces = (data: Message[]) => {
  return {
    type: types.GET_MESSAGES_SUCCES,
    payload: data,
  };
};
export const getChatsFailure = () => {
  return {
    type: types.GET_CHATS_FAILURE,
  };
};
