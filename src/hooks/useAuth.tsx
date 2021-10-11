import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {signIn, signOut} from '../actions/index';

const useAuth = () => {
  const dispatch = useDispatch();
  const values = useSelector(state => state.auth);
  
  return {values, dispatch, signOut, signIn};
};

export default useAuth;
