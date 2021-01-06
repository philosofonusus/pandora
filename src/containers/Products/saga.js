import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import remote from '../../utils/request'

import {LANGUAGE_EN, LANGUAGE_RU, LANGUAGE_ARM} from '../App/constants'

import {productsSuccessEn, productsSuccessRu, productsSuccessArm} from './actions';
import {PRODUCTS_REQUEST_START} from './constants';



export default function* watchProductsSaga() {
  yield takeEvery(PRODUCTS_REQUEST_START, _apiGetProducts);
}

function* _apiGetProducts(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/products?language=${action.language}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      route: url,
      method: 'GET'
    });
    if (response.success) {
      if (action.language === LANGUAGE_EN) {
        yield put(productsSuccessEn(response.data))
      }
      if (action.language === LANGUAGE_RU) {
        yield put(productsSuccessRu(response.data))
      }
      if (action.language === LANGUAGE_ARM) {
        yield put(productsSuccessArm(response.data))
      }
    } else {
      console.log('response eee>>>>', response)
      //yield put(apiTestRequestFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

