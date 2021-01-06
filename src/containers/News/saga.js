import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import remote from '../../utils/request'

import {LANGUAGE_EN, LANGUAGE_RU, LANGUAGE_ARM} from '../App/constants'

import {newsesSuccessArm, newsesSuccessEn, newsesSuccessRu} from './actions';
import {NEWSES_REQUEST_START} from './constants';


export default function* watchNewsesSaga() {
  yield takeEvery(NEWSES_REQUEST_START, _apiGetNewses);
}

function* _apiGetNewses(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/news?language=${action.language}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      route: url,
      method: 'GET'
    });
    if (response.success) {
      if (action.language === LANGUAGE_EN) {
        yield put(newsesSuccessEn(response.data))
      }
      if (action.language === LANGUAGE_RU) {
        yield put(newsesSuccessRu(response.data))
      }
      if (action.language === LANGUAGE_ARM) {
        yield put(newsesSuccessArm(response.data))
      }
    } else {
      console.log('response eee>>>>', response)
      //yield put(apiTestRequestFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

