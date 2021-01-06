import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import remote from '../../utils/request'


import {
  authStateCheckedSccess,
  logout,
  contentSuccessEn,
  contentSuccessRu,
  contentSuccessArm
} from './actions';


import {
  AUTH_CHECK_STATE,
  LANGUAGE_ARM,
  LANGUAGE_EN,
  LANGUAGE_RU,
  CONTENT_REQUEST_START
} from './constants';



export default function* watchAppSaga() {
  yield takeLatest(AUTH_CHECK_STATE, _authCheckState);
  yield takeEvery(CONTENT_REQUEST_START, _getContent);
}

export function* _authCheckState() {
  const access_token = localStorage.getItem('access_token');

  if (access_token) {
    yield put(authStateCheckedSccess());
  } else {
    yield put(logout());
  }
}


function* _getContent(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/contents?language=${action.language}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      route: url,
      method: 'GET'
    });
    if (response.success) {
      if (action.language === LANGUAGE_EN) {
        yield put(contentSuccessEn(response.data))
      }
      if (action.language === LANGUAGE_RU) {
        yield put(contentSuccessRu(response.data))
      }
      if (action.language === LANGUAGE_ARM) {
        yield put(contentSuccessArm(response.data))
      }
    } else {
      //yield put(apiTestRequestFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


