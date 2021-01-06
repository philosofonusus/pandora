import {
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  REMOVE_PRODUCT_START,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  RESET_PRODUCT_MESSAGES,
  GET_CARS_START,
  GET_CARS_SUCCESS,
  GET_CARS_FAIL,
  CREATE_CAR_START,
  CREATE_CAR_SUCCESS,
  CREATE_CAR_FAIL,
  REMOVE_CAR_START,
  REMOVE_CAR_SUCCESS,
  REMOVE_CAR_FAIL,
  ADD_CARS_TO_PRODUCT_START,
  ADD_CARS_TO_PRODUCT_SUCCESS,
  ADD_CARS_TO_PRODUCT_FAIL,
  RESET_CAR_MESSAGES,
  CREATE_NEWS_START,
  CREATE_NEWS_SUCCESS,
  CREATE_NEWS_FAIL,
  REMOVE_NEWS_START,
  REMOVE_NEWS_SUCCESS,
  REMOVE_NEWS_FAIL,
  CREATE_CONTENT_START,
  CREATE_CONTENT_SUCCESS,
  CREATE_CONTENT_FAIL,
  REMOVE_CONTENT_START,
  REMOVE_CONTENT_SUCCESS,
  REMOVE_CONTENT_FAIL,
  RESET_CONTENT_MESSAGES,
  RESET_NEWS_MESSAGES,
  PRODUCTS_SHORT_INFOS_REQUEST_START,
  PRODUCTS_SHORT_INFOS_REQUEST_SUCCESS,
  PRODUCTS_SHORT_INFOS_REQUEST_FAIL,
  PRODUCT_ID_REQUEST_START,
  PRODUCT_ID_REQUEST_SUCCESS,
  PRODUCT_ID_REQUEST_FAIL
} from './constants';


export const createProductStart = (data) => {
  return {type: CREATE_PRODUCT_START, data}
};

export const createProductSuccess = (data) => {
  return {type: CREATE_PRODUCT_SUCCESS, data}
};

export const createProductFail = (error) => {
  return {type: CREATE_PRODUCT_FAIL, error}
};

export const addCarsToProductStart = (data) => {
  return {type: ADD_CARS_TO_PRODUCT_START, data}
};

export const addCarsToProductSuccess = (data) => {
  return {type: ADD_CARS_TO_PRODUCT_SUCCESS, data}
};

export const addCarsToProductFail = (error) => {
  return {type: ADD_CARS_TO_PRODUCT_FAIL, error}
};

export const resetProductMessages = () => {
  return {type: RESET_PRODUCT_MESSAGES}
};

export const removeProductStart = (id) => {
  return {type: REMOVE_PRODUCT_START, id}
};

export const removeProductSuccess = (data) => {
  return {type: REMOVE_PRODUCT_SUCCESS, data}
};

export const removeProductFail = (error) => {
  return {type: REMOVE_PRODUCT_FAIL, error}
};

export const getCars = () => {
  return {type: GET_CARS_START}
};

export const getCarsSuccess = (data) => {
  return {type: GET_CARS_SUCCESS, data}
};

export const getCarsFail = (error) => {
  return {type: GET_CARS_FAIL, error}
};

export const createCarStart = (data) => {
  return {type: CREATE_CAR_START, data}
};


export const createCarSuccess = (data) => {
  return {type: CREATE_CAR_SUCCESS, data}
};

export const createCarFail = (error) => {
  return {type: CREATE_CAR_FAIL, error}
};

export const resetCarMessages = () => {
  return {type: RESET_CAR_MESSAGES}
};

export const removeCarStart = (id) => {
  return {type: REMOVE_CAR_START, id}
};

export const removeCarSuccess = (data) => {
  return {type: REMOVE_CAR_SUCCESS, data}
};

export const removeCarFail = (error) => {
  return {type: REMOVE_CAR_FAIL, error}
};

export const createNewsStart = (data) => {
  return {type: CREATE_NEWS_START, data}
};

export const createNewsSuccess = (data) => {
  return {type: CREATE_NEWS_SUCCESS, data}
};

export const createNewsFail = (error) => {
  return {type: CREATE_NEWS_FAIL, error}
};

export const removeNewsStart = (id) => {
  return {type: REMOVE_NEWS_START, id}
};

export const removeNewsSuccess = (data) => {
  return {type: REMOVE_NEWS_SUCCESS, data}
};

export const removeNewsFail = (error) => {
  return {type: REMOVE_NEWS_FAIL, error}
};

export const resetNewsMessages = () => {
  return {type: RESET_NEWS_MESSAGES}
};

export const createContentStart = (data) => {
  return {type: CREATE_CONTENT_START, data}
};

export const createContentSuccess = (data) => {
  return {type: CREATE_CONTENT_SUCCESS, data}
};

export const createContentFail = (error) => {
  return {type: CREATE_CONTENT_FAIL, error}
};

export const resetContentMessages = () => {
  return {type: RESET_CONTENT_MESSAGES}
};

export const removeContentStart = (id) => {
  return {type: REMOVE_CONTENT_START, id}
};

export const removeContentSuccess = (data) => {
  return {type: REMOVE_CONTENT_SUCCESS, data}
};

export const removeContentFail = (error) => {
  return {type: REMOVE_CONTENT_FAIL, error}
};

export const getProductByIdStart = (id) => {
  return {type: PRODUCT_ID_REQUEST_START, id}
};

export const getProductByIdSuccess = (data) => {
  return {type: PRODUCT_ID_REQUEST_SUCCESS, data}
};

export const getProductByIdFail = (error) => {
  return {type: PRODUCT_ID_REQUEST_FAIL, error}
};

export const getProductsShortInfoStart = () => {
  return {type: PRODUCTS_SHORT_INFOS_REQUEST_START}
};

export const getProductsShortInfoSuccess = (data) => {
  return {type: PRODUCTS_SHORT_INFOS_REQUEST_SUCCESS, data}
};

export const getProductsShortInfoFail = (error) => {
  return {type: PRODUCTS_SHORT_INFOS_REQUEST_FAIL, error}
};

