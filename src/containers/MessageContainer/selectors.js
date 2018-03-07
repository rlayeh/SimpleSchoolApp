import { createSelector } from 'reselect';

const selectMessageDomain = () => (state) => state.messageReducer;

const makeSelectMessages = () => createSelector(
    selectMessageDomain(),
    (substate) => substate.messages
);


export {
    makeSelectMessages,
};
