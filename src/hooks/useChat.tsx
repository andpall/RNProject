import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  startLoad,
  finishLoad,
  getChats,
  getChatsSucces,
  getMessagesSucces,
} from '../actions/index';
import {RootState} from '../store/store';
import {Conversation, Message} from '../types';

const useChat = () => {
  const dispatch = useDispatch();
  const values = useSelector((state: RootState) => state.chat);
  const getChat = (chatName: number) =>
    values.chats.find(chat => chat.id === chatName);
  const startLoading = () => dispatch(startLoad());
  const endLoading = () => dispatch(finishLoad());
  const pushChats = (data: Conversation[]) => dispatch(getChatsSucces(data));
  const pushMessages = (data: Message[]) => dispatch(getMessagesSucces(data));
  const fetchChats = () => dispatch(getChats());

  return {
    ...values,
    dispatch,
    startLoading,
    endLoading,
    fetchChats,
    pushChats,
    getChat,
    pushMessages,
  };
};

export default useChat;
