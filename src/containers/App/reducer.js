import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL} from '../LogIn/constants';

import {
  LANGUAGE_EN,
  LANGUAGE_RU,
  LANGUAGE_ARM,
  CHANGE_APP_LANGUAGE,
  DROPDOWN_CANCEL_HIDE,
  DROPDOWN_HIDE,
  AUTH_LOGOUT,
  AUTHORIZATION_ERROR,
  RESET_AUTHORIZATION_ERROR,
  UNKNOWN_ERROR,
  RESET_UNKNOWN_ERROR,
  CONTENT_REQUEST_SUCCESS_EN,
  CONTENT_REQUEST_SUCCESS_RU,
  CONTENT_REQUEST_SUCCESS_ARM, AUTH_STATE_CHECKED_SCCESS,

} from './constants';


const structureContentData = arr => {
  const obj = {};
  arr.forEach(item => {
    obj[item.title] = item.description
  })
  return obj
}


// The initial state of the App
const initialState = {
  appLanguage: LANGUAGE_ARM,
  dataFromApi: {},
  dropdownClass: '',
  isAuthenticated: '',
  loading: false,
  authorizationError: '',
  unknownError: '',

  content: {
    [LANGUAGE_EN]: {
      contentIsLoaded: false,
      data: [],
      structuredContentData: {}
    },
    [LANGUAGE_RU]: {
      contentIsLoaded: false,
      data: [],
      structuredContentData: {}
    },
    [LANGUAGE_ARM]: {
      contentIsLoaded: false,
      data: [],
      structuredContentData: {}
    }
  }


};
const appReducer = (state = initialState, action) => {

  switch (action.type) {

    case AUTH_STATE_CHECKED_SCCESS: {
      return Object.assign({}, state, {
        isAuthenticated: true,
        loading: false,
      })
    }

    case CHANGE_APP_LANGUAGE:
      return Object.assign({}, state, {
        appLanguage: action.language
      })

    case DROPDOWN_CANCEL_HIDE:
      return Object.assign({}, state, {
        dropdownClass: ''
      })

    case DROPDOWN_HIDE:
      return Object.assign({}, state, {
        dropdownClass: 'dropdown-display-cancel'
      })

    case LOGIN_START:
      return Object.assign({}, state, {
        isAuthenticated: false,
        loading: true
      });

    case LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        isAuthenticated: true,
        loading: false
      })
    }

    case LOGIN_FAIL: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        loading: false
      })
    }

    case AUTHORIZATION_ERROR: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        loading: false,
        authorizationError: action.error.message
      });
    }

    case UNKNOWN_ERROR: {
      return Object.assign({}, state, {
        unknownError: action.error.message
      });
    }

    case RESET_UNKNOWN_ERROR: { // todo --------------------
      return Object.assign({}, state, {
        unknownError: ''
      });
    }

    case RESET_AUTHORIZATION_ERROR: {
      return Object.assign({}, state, {
        authorizationError: ''
      });
    }


    case AUTH_LOGOUT: {
      localStorage.removeItem('access_token');
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false
      });
    }

    case CONTENT_REQUEST_SUCCESS_EN:
      return Object.assign({}, state, {
        content: {
          ...state.content,
          [LANGUAGE_EN]: {
            contentIsLoaded: true,
            data: action.data,
            structuredContentData: structureContentData(action.data)
          }
        }
      })

    case CONTENT_REQUEST_SUCCESS_RU:
      return Object.assign({}, state, {
        content: {
          ...state.content,
          [LANGUAGE_RU]: {
            contentIsLoaded: true,
            data: action.data,
            structuredContentData: structureContentData(action.data)
          }
        }
      })

    case CONTENT_REQUEST_SUCCESS_ARM:
      return Object.assign({}, state, {
        content: {
          ...state.content,
          [LANGUAGE_ARM]: {
            contentIsLoaded: true,
            data: action.data,
            structuredContentData: structureContentData(action.data)
          }
        }
      })


    default:
      return state

  }
};

export default appReducer;
