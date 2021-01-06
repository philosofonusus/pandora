import {
  CHANGE_APP_LANGUAGE,
  DROPDOWN_CANCEL_HIDE,
  DROPDOWN_HIDE,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_CHECK_STATE,
  AUTH_STATE_CHECKED_SCCESS,
  AUTHORIZATION_ERROR,
  RESET_AUTHORIZATION_ERROR,
  UNKNOWN_ERROR,
  RESET_UNKNOWN_ERROR,
  CONTENT_REQUEST_START,
  CONTENT_REQUEST_SUCCESS_EN,
  CONTENT_REQUEST_SUCCESS_RU,
  CONTENT_REQUEST_SUCCESS_ARM
} from './constants';


export const changeAppLanguage = (language) => {
  return {type: CHANGE_APP_LANGUAGE, language}
}


export const dropdownHide = () => {
  return {type: DROPDOWN_HIDE}
}

export const canalDropdownHide = () => {
  return {type: DROPDOWN_CANCEL_HIDE}
}



export const authStart = (data) => {
  return {type: AUTH_START, data}
};

export const authSuccess = (data) => {
  return {type: AUTH_SUCCESS, data}
};


export const logout = () => {
  return {type: AUTH_LOGOUT}
};

export const authCheckState = () => {
  return {type: AUTH_CHECK_STATE}
};

export const authStateCheckedSccess = () => {
  return {type: AUTH_STATE_CHECKED_SCCESS}
};



export const authFail = (error) => {
  return {type: AUTHORIZATION_ERROR, error}
};

export const unknownError = (error) => {
  return {type: UNKNOWN_ERROR, error}
}

export const resetUnknownError = () => {
  return {type: RESET_UNKNOWN_ERROR}
}

export const resetAuthError = () => {
  return {type: RESET_AUTHORIZATION_ERROR}
}

export const getContent = (language) => {
  return {type: CONTENT_REQUEST_START, language}
}

export const contentSuccessEn = (data) => {
  return {type: CONTENT_REQUEST_SUCCESS_EN, data}
}

export const contentSuccessRu = (data) => {
  return {type: CONTENT_REQUEST_SUCCESS_RU, data}
}

export const contentSuccessArm = (data) => {
  return {type: CONTENT_REQUEST_SUCCESS_ARM, data}
}


