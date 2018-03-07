import { takeLatest, put } from 'redux-saga/effects';
import { getContext } from '../../utils/context';
import { callApi, callDelete, callPost, callPut } from '../../utils/callApi';
import {
  FETCH_STUDENTS,
  EDIT_STUDENT,
  EDIT_STUDENT_SUCCESS,
  DELETE_STUDENT,
  DELETE_STUDENT_SUCCESS,
  fetchStudents,
  fetchStudentsSuccess,
  fetchStudentsError,
  editStudentSuccess,
  editStudentError,
  deleteStudentSuccess,
  deleteStudentError,
} from './actions';

const getUrlPart = (url) => {
  const urlAfterMath = url.match(/students\/.*/);

  return urlAfterMath.length ? urlAfterMath[0] : null;
};

const getEmbededList = (list) => list._embedded.students; //eslint-disable-line
const getSelfUrl = (student) => student._links ? student._links.self.href : null; //eslint-disable-line

export function* fetchStudentsSaga() {
  const endpoint = 'students';
  const contextPath = getContext();
  const url = `${contextPath}/${endpoint}`;

  try {
    const res = yield callApi(url);
    yield put(fetchStudentsSuccess(getEmbededList(res.json)));
  } catch (err) {
    yield put(fetchStudentsError('Error while fetching students'));
  }
}

export function* deleteStudentSaga(action) {
  if (!action.student) {
    return undefined;
  }

  const endpoint = getUrlPart(getSelfUrl(action.student));
  const contextPath = getContext();
  const url = `${contextPath}/${endpoint}`;

  try {
    yield callDelete(url, deleteStudentSuccess);
  } catch (err) {
    yield put(deleteStudentError('Error while deleting student'));
  }

  return undefined;
}

export function* editStudentSaga(action) {
  const student = action.student;
  const studentUrl = getSelfUrl(student);
  const endpoint = studentUrl ? getUrlPart(studentUrl) : 'students';
  const contextPath = getContext();
  const url = `${contextPath}/${endpoint}`;

  const actionType = studentUrl ? callPut : callPost;

  try {
    yield actionType(url, editStudentSuccess, editStudentError, action.student);
  } catch (err) {
    console.log(err);
  }
}

export function* reFetchStudentsSaga() {
  yield put(fetchStudents());
}


export function* rootSchoolMainContainerSaga() {
  yield takeLatest(FETCH_STUDENTS, fetchStudentsSaga);
  yield takeLatest([EDIT_STUDENT_SUCCESS, DELETE_STUDENT_SUCCESS], reFetchStudentsSaga);
  yield takeLatest(DELETE_STUDENT, deleteStudentSaga);
  yield takeLatest(EDIT_STUDENT, editStudentSaga);
}

export default rootSchoolMainContainerSaga;
