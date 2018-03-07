export const FETCH_STUDENTS = 'app/schoolMainContainer/FETCH_STUDENTS';
export const FETCH_STUDENTS_SUCCESS = 'app/schoolMainContainer/FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_ERROR = 'app/schoolMainContainer/FETCH_STUDENTS_ERROR';
export const TOGGLE_FORM = 'app/schoolMainContainer/TOGGLE_FORM';

export const EDIT_STUDENT = 'app/schoolMainContainer/EDIT_STUDENT';
export const EDIT_STUDENT_SUCCESS = 'app/schoolMainContainer/EDIT_STUDENT_SUCCESS';
export const EDIT_STUDENT_ERROR = 'app/schoolMainContainer/EDIT_STUDENT_ERROR';

export const DELETE_STUDENT = 'app/schoolMainContainer/DELETE_STUDENT';
export const DELETE_STUDENT_SUCCESS = 'app/schoolMainContainer/DELETE_STUDENT_SUCCESS';
export const DELETE_STUDENT_ERROR = 'app/schoolMainContainer/DELETE_STUDENT_ERROR';

export const fetchStudents = () => ({
  type: FETCH_STUDENTS,
});

export const fetchStudentsSuccess = (students) => ({
  type: FETCH_STUDENTS_SUCCESS,
  students,
});

export const fetchStudentsError = (err) => ({
  type: FETCH_STUDENTS_ERROR,
  err,
});

export const toggleForm = (show, student) => ({
  type: TOGGLE_FORM,
  show,
  student,
});

export const editStudent = (student) => ({
  type: EDIT_STUDENT,
  student,
});

export const editStudentSuccess = () => ({
  type: EDIT_STUDENT_SUCCESS,
});

export const editStudentError = (err) => ({
  type: EDIT_STUDENT_ERROR,
  err,
});

export const deleteStudent = (student) => ({
  type: DELETE_STUDENT,
  student,
});

export const deleteStudentSuccess = () => ({
  type: DELETE_STUDENT_SUCCESS,
});

export const deleteStudentError = (err) => ({
  type: DELETE_STUDENT_ERROR,
  err,
});

