import status from 'http-status';

import * as actionCreators from '../containers/App/actions';
import {
  VALIDATION_ERROR,
  SERVER_ERROR,
  UNKNOWN_ERROR,
  PAGE_NOT_FOUND_ERROR,
  DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR
} from '../containers/App/constants';

import store from '../store';


const handleErrorFromResponse = (responseStatusCode, _response) => {
  const error = {
    type: UNKNOWN_ERROR,
    message: DEFAULT_ERROR_MESSAGE
  };

  // todo // handel and assign error type and messages according to responseStatusCode
  // todo // as well as dispatch actions

  if (responseStatusCode === status.UNPROCESSABLE_ENTITY) {
    error.type = VALIDATION_ERROR;
    //store.dispatch(actionCreators.validationsErrors(_response));
  }

  if (responseStatusCode === 401) { // todo improve this approach

    error.type = AUTHORIZATION_ERROR
    console.log('{...error, ..._response}', {...error, ..._response})
    store.dispatch(actionCreators.logout())
    return {...error, ..._response}
  }


  if (responseStatusCode === status.INTERNAL_SERVER_ERROR) {
    error.type = SERVER_ERROR;
    //store.dispatch(actionCreators.serverErrors(error.message));
    return error
  }

  return error
};




export default function request(url, options) {

// todo reset validation, server, authorization errors before fetching

  // options['credentials'] = 'include';
  // options.headers['X-Auth-Token'] = localStorage.getItem('token');

  const returnData = {
    success: false,
    data: {},
    error: {}
  };

  // store.dispatch(actionCreators.resetValidationsErrors());
  // store.dispatch(actionCreators.resetServerErrors());
  // store.dispatch(actionCreators.resetAuthorizationError());

  let responseStatusCode;


  return fetch(url, options)
    .then(response => {
      responseStatusCode = response.status;

      if (response.ok) {
        returnData.success = true;

        // const token = response.headers.get('X-Auth-Token');
        // if (token) {
        //   localStorage.setItem('token', token)
        // }
      }

      //const contentType = response.headers.get('content-type');
      // todo check contentType  before process it further

      for (let pair of response.headers.entries()) {
      }


      return response.json().catch(e => console.log('invalid json', e))
    })
    .then(_response => {

      if (returnData.success) {
        returnData.data = _response
      } else {
        returnData.error = handleErrorFromResponse(responseStatusCode, _response)
      }

      return returnData
    })
    .catch(error => {
      console.log(error);
      returnData.success = false;
      returnData.error.type = UNKNOWN_ERROR;
      returnData.error.message = DEFAULT_ERROR_MESSAGE;
      return returnData;
    })
}
