import {createSelector} from 'reselect';

export const makeSelectProductSuccess = createSelector(
  state => state.admin,
  admin => admin.productSuccess
)
export const makeSelectProductFail = createSelector(
  state => state.admin,
  admin => admin.productFail
)

export const makeSelectNewsSuccess = createSelector(
  state => state.admin,
  admin => admin.newsSuccess
)
export const makeSelectNewsFail = createSelector(
  state => state.admin,
  admin => admin.newsFail
)

export const makeSelectCarSuccess = createSelector(
  state => state.admin,
  admin => admin.carSuccess
)
export const makeSelectCarFail = createSelector(
  state => state.admin,
  admin => admin.carFail
)

export const makeSelectCars = createSelector(
  state => state.admin,
  admin => admin.cars
)


export const makeSelectContentSuccess = createSelector(
  state => state.admin,
  admin => admin.contentSuccess
)
export const makeSelectContentFail = createSelector(
  state => state.admin,
  admin => admin.contentFail
)

export const makeSelectProductsShortInfo = createSelector(
  state => state.admin,
  admin => admin.productsShortInfo
)

export const makeSelectProductsCars = createSelector(
  state => state.admin,
  admin => admin.productsCars
)
