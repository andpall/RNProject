import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {startLoad, finishLoad} from '../actions/index';

const useChat = () => {
  const dispatch = useDispatch();
  const values = useSelector(state => state.chat);
  const startLoading = () => dispatch(startLoad());
  const endLoading = () => dispatch(finishLoad());
  return {...values, dispatch, startLoading, endLoading};
};

export default useChat;