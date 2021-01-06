import {combineReducers} from 'redux';

import appReducer from './containers/App/reducer';
import newsReducer from './containers/News/reducer';
import productsReducer from './containers/Products/reducer';
import adminReducer from './containers/Admin/reducer';
// TODO import other reducer


export default function createCombineReducer() {
  return combineReducers({
    global: appReducer,
    news: newsReducer,
    products: productsReducer,
    admin: adminReducer
    //TODO other reducer HERE
  });
}
