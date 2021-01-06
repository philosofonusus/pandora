import {
  NEWSES_REQUEST_START,
  NEWSES_REQUEST_SUCCESS_EN,
  NEWSES_REQUEST_SUCCESS_RU,
  NEWSES_REQUEST_SUCCESS_ARM,
  LOAD_MORE_NEWSES
} from './constants';


export const getNewses = (language) => {
  return {type: NEWSES_REQUEST_START, language}
}

export const newsesSuccessEn = (data) => {
  return {type: NEWSES_REQUEST_SUCCESS_EN, data}
}

export const newsesSuccessRu = (data) => {
  return {type: NEWSES_REQUEST_SUCCESS_RU, data}
}

export const newsesSuccessArm = (data) => {
  return {type: NEWSES_REQUEST_SUCCESS_ARM, data}
}

export const loadMoreNewses = () => {
  return {type: LOAD_MORE_NEWSES}
}



