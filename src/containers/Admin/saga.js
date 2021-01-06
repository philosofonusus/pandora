import {all, call, put, takeLatest, takeEvery, delay} from 'redux-saga/effects';

import remote from '../../utils/request'

import {DEFAULT_ERROR_MESSAGE} from '../App/constants';

import {
  createProductSuccess, createProductFail, removeProductSuccess, removeProductFail,
  getCarsSuccess, getCarsFail, createCarSuccess, createCarFail, removeCarSuccess,
  removeCarFail,
  addCarsToProductSuccess,
  addCarsToProductFail,
  createNewsSuccess,
  createNewsFail,
  removeNewsSuccess,
  removeNewsFail,
  createContentSuccess,
  createContentFail,
  removeContentSuccess,
  removeContentFail,
  getProductsShortInfoSuccess,
  getProductsShortInfoFail,
  getProductByIdSuccess,
  getProductByIdFail
} from './actions';
import {
  CREATE_PRODUCT_START,
  REMOVE_PRODUCT_START,
  GET_CARS_START,
  CREATE_CAR_START,
  REMOVE_CAR_START,
  ADD_CARS_TO_PRODUCT_START,
  CREATE_NEWS_START,
  REMOVE_NEWS_START,
  CREATE_CONTENT_START,
  REMOVE_CONTENT_START,
  PRODUCTS_SHORT_INFOS_REQUEST_START,
  PRODUCT_ID_REQUEST_START
} from './constants';


export default function* watchAdminSaga() {
  yield takeLatest(CREATE_PRODUCT_START, _createProduct);
  yield takeLatest(REMOVE_PRODUCT_START, _removeProduct);
  yield takeEvery(GET_CARS_START, _getCars);
  yield takeLatest(CREATE_CAR_START, _createCar)
  yield takeLatest(REMOVE_CAR_START, _removeCar)
  yield takeLatest(ADD_CARS_TO_PRODUCT_START, _addCarsToProduct)
  yield takeLatest(CREATE_NEWS_START, _createNews)
  yield takeLatest(REMOVE_NEWS_START, _removeNews)
  yield takeLatest(CREATE_CONTENT_START, _createContent)
  yield takeLatest(REMOVE_CONTENT_START, _removeContent)
  yield takeLatest(PRODUCTS_SHORT_INFOS_REQUEST_START, _getProductsShortInfo)
  yield takeLatest(PRODUCT_ID_REQUEST_START, _getProductsById)
}


function* _createProduct(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/products`;

  try {

    const response = yield call(remote, url, { //TODO add remote
      method: 'POST',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'Product Was Successfully Created'

      yield put(createProductSuccess(response.data));
    } else {
      yield put(createProductFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _removeProduct(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/products/${action.id}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'DELETE',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'Product Was Successfully Deleted'

      yield put(removeProductSuccess(response.data));
    } else {
      yield put(removeProductFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _getCars(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/cars`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'GET'
    });

    if (response.success) {
      yield put(getCarsSuccess(response.data));
    } else {
      yield put(getCarsFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _createCar(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/cars`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'POST',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'Car Was Successfully Created'
      yield put(createCarSuccess(response.data));
    } else {
      yield put(createCarFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _removeCar(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/cars/${action.id}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'DELETE',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'Car Was Successfully Deleted'
      yield put(removeCarSuccess(response.data));
    } else {
      yield put(removeCarFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _addCarsToProduct(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/products/${action.data.productId}/cars/bulk`;
  try {
    const carIds = [];
    action.data.cars.forEach(car => {
      const carId = typeof car === 'object' ? car.value : car
      carIds.push(carId)
    })


    const response = yield call(remote, url, { //TODO add remote
      method: 'POST',
      body: JSON.stringify({carIds: carIds}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'Car Was Successfully Created'
      yield put(addCarsToProductSuccess({message: `Car Models Were Successfully Added`}));
    } else {
      yield put(addCarsToProductFail({message: DEFAULT_ERROR_MESSAGE}));
    }
  } catch (e) {
    console.log(e);
    ;
  }
}


function* _createNews(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/news`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'POST',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'News Was Successfully Created'
      yield put(createNewsSuccess(response.data));
    } else {
      yield put(createNewsFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _removeNews(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/news/${action.id}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'News Was Successfully Deleted'

      yield put(removeNewsSuccess(response.data));
    } else {
      yield put(removeNewsFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _createContent(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/contents`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'POST',
      body: JSON.stringify(action.data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'Content Was Successfully Created'

      yield put(createContentSuccess(response.data));
    } else {
      yield put(createContentFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _removeContent(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/contents/${action.id}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      response.data.message = 'Content Was Successfully Deleted'

      yield put(removeContentSuccess(response.data));
    } else {
      yield put(removeContentFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}


function* _getProductsShortInfo(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/products/short-infos`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      yield put(getProductsShortInfoSuccess(response.data));
    } else {
      yield put(getProductsShortInfoFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

function* _getProductsById(action) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/products/${action.id}`;

  try {
    const response = yield call(remote, url, { //TODO add remote
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (response.success) {
      yield put(getProductByIdSuccess(response.data));
    } else {
      yield put(getProductByIdFail(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

