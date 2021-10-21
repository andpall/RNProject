import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {signIn, signOut} from '../actions/index';

const useChat = () => {
  const dispatch = useDispatch();
  const values = useSelector(state => state.auth);
  const logIn = () => dispatch(signIn());
  const logOut = () => dispatch(signOut());
  return {...values, dispatch, logIn, logOut};
};

export default useChat;