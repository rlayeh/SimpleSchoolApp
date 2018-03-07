import {
  FETCH_STUDENTS,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_ERROR,
  TOGGLE_FORM,
  EDIT_STUDENT,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_ERROR,
} from './actions';

const initialState = {
  students: null,
  formVisible: false,
  editedStudent: null,
  loading: false,
};
function schoolMainContainerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.students,
        loading: false,
      };
    case FETCH_STUDENTS_ERROR:
      return {
        ...state,
        students: null,
        loading: false,
      };
    case TOGGLE_FORM:
      return {
        ...state,
        formVisible: action.show || false,
        editedStudent: action.student,
      };
    case EDIT_STUDENT:
      return {
        ...state,
        loading: true,
      };
    case EDIT_STUDENT_SUCCESS:
    case EDIT_STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        formVisible: false,
        editedStudent: null,
      };
    default:
      return state;
  }
}
export default schoolMainContainerReducer;
