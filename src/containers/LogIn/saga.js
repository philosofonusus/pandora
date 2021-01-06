import {call, put, takeLatest} from "redux-saga/effects";

import remote from '../../utils/request'

import {loginSuccess, loginFail} from './actions';
import {LOGIN_START} from './constants';


export default function* loginSaga() {
  yield takeLatest(LOGIN_START, _loginStart);
}


function* _loginStart(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
  try {
    const response = yield call(remote, url, {
      route: url,
      method: 'POST',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.success) {
      yield localStorage.setItem('access_token', response.data.access_token) // todo access_token

      yield put(loginSuccess(response.data));
    } else {
      yield put(loginFail(response.error));
      // todo handel error
    }
  } catch (e) {
    console.log(e);
  }
}


