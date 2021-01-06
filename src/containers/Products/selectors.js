import {createSelector} from 'reselect';

const selectProducts = state => state['products'];

export const makeSelectProducts = createSelector(
  [selectProducts],
  products => products
);

export const makeSelectDisplayProductsCount = createSelector(
  [selectProducts],
  products => products.displayProductsCount
);
export const makeSelectProductSeries = createSelector(
  [selectProducts],
  products => products.productSeries
);




