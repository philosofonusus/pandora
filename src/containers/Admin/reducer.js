import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  RESET_PRODUCT_MESSAGES,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  GET_CARS_SUCCESS,
  GET_CARS_FAIL,
  CREATE_CAR_SUCCESS,
  CREATE_CAR_FAIL,
  REMOVE_CAR_SUCCESS,
  REMOVE_CAR_FAIL,
  ADD_CARS_TO_PRODUCT_SUCCESS,
  ADD_CARS_TO_PRODUCT_FAIL,
  RESET_CAR_MESSAGES,
  CREATE_NEWS_SUCCESS,
  CREATE_NEWS_FAIL,
  REMOVE_NEWS_SUCCESS,
  REMOVE_NEWS_FAIL,
  RESET_NEWS_MESSAGES,
  CREATE_CONTENT_SUCCESS,
  CREATE_CONTENT_FAIL,
  REMOVE_CONTENT_SUCCESS,
  REMOVE_CONTENT_FAIL,
  RESET_CONTENT_MESSAGES,
  PRODUCT_ID_REQUEST_SUCCESS,
  PRODUCT_ID_REQUEST_FAIL,
  PRODUCTS_SHORT_INFOS_REQUEST_SUCCESS,
  PRODUCTS_SHORT_INFOS_REQUEST_FAIL
} from './constants';


// The initial state of the App
const initialState = {
  productSuccess: '',
  productFail: '',
  createdProduct: {},

  carSuccess: '',
  carFail: '',

  newsSuccess: '',
  newsFail: '',

  contentSuccess: '',
  contentFail: '',

  cars: [],

  authorizationError: '',
  unknownError: '',
  productsCars: {},
  productsShortInfo: []

};
const adminReducer = (state = initialState, action) => {

  switch (action.type) {

    case CREATE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        productSuccess: action.data.message,
        createdProduct: action.data
      })

    case REMOVE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        productSuccess: action.data.message
      })

    case PRODUCT_ID_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        productsCars: {
          ...state.productsCars,
          [action.data.id]: action.data
        }
      })

    case PRODUCTS_SHORT_INFOS_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        productsShortInfo: action.data
      })

    case CREATE_NEWS_SUCCESS:
    case REMOVE_NEWS_SUCCESS:
      return Object.assign({}, state, {
        newsSuccess: action.data.message
      })

    case CREATE_CONTENT_SUCCESS:
    case REMOVE_CONTENT_SUCCESS:
      return Object.assign({}, state, {
        contentSuccess: action.data.message
      })

    case CREATE_CONTENT_FAIL:
    case REMOVE_CONTENT_FAIL:
      console.log(action)
      return Object.assign({}, state, {
        contentFail: action.error.message
      })

    case RESET_CONTENT_MESSAGES:
      return Object.assign({}, state, {
        contentSuccess: '',
        contentFail: ''
      })

    case CREATE_NEWS_FAIL:
    case REMOVE_NEWS_FAIL:
      return Object.assign({}, state, {
        newsFail: action.error.message
      })

    case RESET_NEWS_MESSAGES:
      return Object.assign({}, state, {
        newsSuccess: '',
        newsFail: ''
      })

    case PRODUCTS_SHORT_INFOS_REQUEST_FAIL:
    case CREATE_PRODUCT_FAIL:
    case PRODUCT_ID_REQUEST_FAIL:
      return Object.assign({}, state, {
        productFail: action.error.message
      })

    case REMOVE_PRODUCT_FAIL:
      return Object.assign({}, state, {
        carFail: action.error.message
      })

    case ADD_CARS_TO_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        productSuccess: action.data.message
      })

    case ADD_CARS_TO_PRODUCT_FAIL:
      return Object.assign({}, state, {
        productFail: action.error.message
      })

    case RESET_PRODUCT_MESSAGES:
      return Object.assign({}, state, {
        productSuccess: '',
        productFail: ''
      })

    case CREATE_CAR_SUCCESS:
      return Object.assign({}, state, {
        carSuccess: action.data.message
      })

    case REMOVE_CAR_SUCCESS:
      return Object.assign({}, state, {
        carSuccess: action.data.message
      })

    case GET_CARS_SUCCESS:
      return Object.assign({}, state, {
        cars: action.data
        // todo check
      })

    case GET_CARS_FAIL:
      return Object.assign({}, state, {
        carFail: action.error.message
      })

    case CREATE_CAR_FAIL:
      console.log(action)
      return Object.assign({}, state, {
        carFail: action.error.message
      })

    case REMOVE_CAR_FAIL:
      console.log(action)
      return Object.assign({}, state, {
        carFail: action.error.message
      })

    case RESET_CAR_MESSAGES:
      return Object.assign({}, state, {
        carSuccess: '',
        carFail: ''
      })


    default:
      return state

  }
};

export default adminReducer;
