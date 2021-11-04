import {
  call,
  put,
  spawn,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getChats as getChatsFromDB,
  subscribeOnChats,
} from '../services/firestore';
import {Conversation} from '../types';
import {getChats, getChatsFailure, getChatsSucces} from '../actions/';
import {AnyAction} from 'redux';

function* conversationWatcher() {
  yield takeEvery(types.GET_CHATS, fetchConversationsWorker);
}

function* fetchConversationsWorker() {
  try {
    console.debug('AfterYield');
    // yield put(getChats());
    const data = yield call(getChatsFromDB);
    yield put(getChatsSucces(data));
  } catch (e) {
    yield put(getChatsFailure());
    console.debug('ERROR', e);
  }
}

function* rootSaga() {
  yield spawn(conversationWatcher);
}
export default rootSaga;
