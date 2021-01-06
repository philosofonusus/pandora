import {
  CHANGE_PRODUCT_TYPE,
  PRODUCTS_REQUEST_START,
  PRODUCTS_REQUEST_SUCCESS_EN,
  PRODUCTS_REQUEST_SUCCESS_RU,
  LOAD_MORE_PRODUCTS,
  CHANGE_PRODUCT_SERIES, PRODUCTS_REQUEST_SUCCESS_ARM
} from './constants';


export const changeProductType = (productType) => {
  return {type: CHANGE_PRODUCT_TYPE, productType}
}

export const getProducts = (language) => {
  return {type: PRODUCTS_REQUEST_START, language}
}

export const productsSuccessEn = (data) => {
  return {type: PRODUCTS_REQUEST_SUCCESS_EN, data}
}

export const productsSuccessRu = (data) => {
  return {type: PRODUCTS_REQUEST_SUCCESS_RU, data}
}

export const productsSuccessArm = (data) => {
  return {type: PRODUCTS_REQUEST_SUCCESS_ARM, data}
}

export const changeProductSeries = (data) => {
  return {type: CHANGE_PRODUCT_SERIES, data}
}

export const loadMoreProducts = () => {
  return {type: LOAD_MORE_PRODUCTS}
}







