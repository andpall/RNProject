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

// export function* sagaWatcher() {
//   yield takeEvery(types.GET_CHATS, sagaWorker);
// }

// export function* sagaWorker() {
//   // const data = yield call(asFunc);

//   let chatiki: Conversation[];
//   const updateChats = (chats: Conversation[]) => {
//     chatiki = chats;
//   };
//   yield call(subscribeOnChats, updateChats);

//   yield console.debug(chatiki);

//   yield put({type: types.GET_CHATS_SUCCES, payload: chatiki});
// }

function* rootSaga() {
  yield spawn(conversationWatcher);
}
export default rootSaga;
