import {createSelector} from 'reselect';

const selectGlobal = state => state['global'];

export const makeSelectAppLanguage = createSelector(
  [selectGlobal],
  global => global.appLanguage
);

export const makeSelectDataFromApi = createSelector(
  [selectGlobal],
  global => global.dataFromApi
);

export const makeSelectDropdownClass = createSelector(
  [selectGlobal],
  global => global.dropdownClass
)

export const makeSelectIsAuthenticated = createSelector(
  [selectGlobal],
  global => global.isAuthenticated
);

export const makeSelectLoad = createSelector(
  [selectGlobal],
  global => global.loading
);

export const makeSelectContent = createSelector(
  [selectGlobal],
  global => global.content
);


