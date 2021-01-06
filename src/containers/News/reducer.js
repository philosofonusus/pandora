import {LANGUAGE_EN, LANGUAGE_RU, LANGUAGE_ARM} from '../App/constants';
import {
  NEWSES_REQUEST_SUCCESS_EN,
  NEWSES_REQUEST_SUCCESS_RU,
  NEWSES_REQUEST_SUCCESS_ARM,
  LOAD_MORE_NEWSES
} from './constants';


// The initial state of the App
const initialState = {
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
  },
  displayNewsesCount: 6
};
const newsReducer = (state = initialState, action) => {

  switch (action.type) {
    case NEWSES_REQUEST_SUCCESS_EN:
      return Object.assign({}, state, {
        [LANGUAGE_EN]: {
          contentIsLoaded: true,
          data: action.data
        }
      })

    case NEWSES_REQUEST_SUCCESS_RU:
      return Object.assign({}, state, {
        [LANGUAGE_RU]: {
          contentIsLoaded: true,
          data: action.data
        }
      })

 case NEWSES_REQUEST_SUCCESS_ARM:
      return Object.assign({}, state, {
        [LANGUAGE_ARM]: {
          contentIsLoaded: true,
          data: action.data
        }
      })

    case LOAD_MORE_NEWSES:
      return Object.assign({}, state, {
        displayNewsesCount: state.displayNewsesCount + 6
      })


    default:
      return state

  }
};

export default newsReducer;
