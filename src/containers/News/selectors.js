import {createSelector} from 'reselect';

const selectNews = state => state['news'];

export const makeSelectNewses = createSelector(
  [selectNews],
  newses => newses
);

export const makeSelectDisplayNewsesCount = createSelector(
  [selectNews],
  newses => newses.displayNewsesCount
);


