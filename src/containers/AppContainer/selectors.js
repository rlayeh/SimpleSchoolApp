import { createSelector } from 'reselect';

const selectAppDomain = () => (state) => state.appReducer;

const makeSelectCurrLocale = () => createSelector(
    selectAppDomain(),
    (substate) => substate.currLocale
);

export {
    makeSelectCurrLocale,
};
