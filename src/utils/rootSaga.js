import { fork} from 'redux-saga/effects';

import appSaga from '../containers/App/saga';
import newsesSaga from '../containers/News/saga';
import productsSaga from '../containers/Products/saga';
import loginSaga from '../containers/LogIn/saga';
import adminSaga from '../containers/Admin/saga';


export default function* rootSaga() {
  yield fork(appSaga);
  yield fork(newsesSaga);
  yield fork(productsSaga);
  yield fork(adminSaga);
  yield fork(loginSaga);


}
