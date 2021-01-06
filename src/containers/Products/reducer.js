import {LANGUAGE_EN, LANGUAGE_RU, LANGUAGE_ARM} from '../App/constants';
import {
  CHANGE_PRODUCT_TYPE,
  PRODUCTS_REQUEST_SUCCESS_EN,
  PRODUCTS_REQUEST_SUCCESS_RU,
  PRODUCTS_REQUEST_SUCCESS_ARM,
  LOAD_MORE_PRODUCTS,
  PRODUCTS_SERIES_ALL,
  CHANGE_PRODUCT_SERIES
} from './constants';


// The initial state of the App
const initialState = {
  productType: 'car',
  displayProductsCount: 6,
  productSeries: PRODUCTS_SERIES_ALL,

  [LANGUAGE_EN]: {
    contentIsLoaded: false,
    data: []
  },
  [LANGUAGE_RU]: {
    contentIsLoaded: false,
    data: []
  },
  [LANGUAGE_ARM]: {
    contentIsLoaded: false,
    data: []
  }

};
const productsReducer = (state = initialState, action) => {

  switch (action.type) {

    case CHANGE_PRODUCT_TYPE:
      return Object.assign({}, state, {
        productType: action.productType
      })


    case PRODUCTS_REQUEST_SUCCESS_EN:
      return Object.assign({}, state, {
        [LANGUAGE_EN]: {
          contentIsLoaded: true,
          data: action.data
        }
      })

    case PRODUCTS_REQUEST_SUCCESS_RU:
      return Object.assign({}, state, {
        [LANGUAGE_RU]: {
          contentIsLoaded: true,
          data: action.data
        }
      })

    case PRODUCTS_REQUEST_SUCCESS_ARM:
      return Object.assign({}, state, {
        [LANGUAGE_ARM]: {
          contentIsLoaded: true,
          data: action.data
        }
      })

    case LOAD_MORE_PRODUCTS:
      return Object.assign({}, state, {
        displayProductsCount: state.displayProductsCount + 6
      })

    case CHANGE_PRODUCT_SERIES:
      return Object.assign({}, state, {
        productSeries: action.data
      })


    default:
      return state

  }
};

export default productsReducer;
