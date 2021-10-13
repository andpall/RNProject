import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {signIn, signInWithPhone, signOut} from '../actions/index';

const useAuth = () => {
  const dispatch = useDispatch();
  const values = useSelector(state => state.auth);
  const logIn = () => dispatch(signIn());
  const logInWithPhone = () => dispatch(signInWithPhone());
  const logOut = () => dispatch(signOut());
  return {...values, dispatch, logIn, logOut, logInWithPhone};
};

export default useAuth;
