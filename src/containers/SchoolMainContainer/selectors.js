import { createSelector } from 'reselect';

const selectStudendsMainContainerDomain = () => (state) => state.studendsMainContainer;

const makeSelectStudents = () => createSelector(
    selectStudendsMainContainerDomain(),
    (substate) => substate.students
);

const makeSelectFormVisible= () => createSelector(
    selectStudendsMainContainerDomain(),
    (substate) => substate.formVisible
);

const makeSelectEditedStudent= () => createSelector(
    selectStudendsMainContainerDomain(),
    (substate) => substate.editedStudent
);

const makeSelectLoading= () => createSelector(
    selectStudendsMainContainerDomain(),
    (substate) => substate.loading
);

export {
    makeSelectStudents,
    makeSelectFormVisible,
    makeSelectEditedStudent,
    makeSelectLoading,
};
