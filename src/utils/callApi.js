import { error as errNotify } from 'react-notification-system-redux';

import { call, put, select } from 'redux-saga/effects';
import { makeSelectCurrLocale } from '../containers/AppContainer/selectors';
import request from './request';

export function* callApi(url, successAction, failureAction, options, resultConverter) {
  const locale = yield select(makeSelectCurrLocale());
  const defaultOptions = options || {};
  const defaultHeaders = defaultOptions.headers || {};
  const newOptions = {
    ...defaultOptions,
    headers: {
      ...defaultHeaders,
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
  };

  try {
    const response = yield call(request, url, newOptions);
    const converted = resultConverter ? resultConverter(response) : response;
    if (successAction) {
      yield put(successAction(converted));
    }
    return converted;
  } catch (err) {
    if (failureAction) {
      yield put(failureAction());
    }
    if (!err.status) {
      const notificationError = {
        message: 'Unable to communicate with the server.',
        level: 'error',
        position: 'tc',
        autoDismiss: 3,
      };
      yield put(errNotify(notificationError));
    }
    throw err;
  }
}

export function* callPut(url, successAction, failureAction, body, options, resultConverter) {
  const defaultOptions = options || {};

  const newOptions = {
    ...defaultOptions,
    method: 'PUT',
    body: body ? JSON.stringify(body) : null,
  };

  return yield callApi(url, successAction, failureAction, newOptions, resultConverter);
}

export function* callPost(url, successAction, failureAction, body, options, resultConverter) {
  const defaultOptions = options || {};

  const newOptions = {
    ...defaultOptions,
    method: 'POST',
    body: body ? JSON.stringify(body) : null,
  };

  return yield callApi(url, successAction, failureAction, newOptions, resultConverter);
}

export function* callPatch(url, successAction, failureAction, body, options, resultConverter) {
  const defaultOptions = options || {};

  const newOptions = {
    ...defaultOptions,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : null,
  };

  return yield callApi(url, successAction, failureAction, newOptions, resultConverter);
}

export function* callDelete(url, successAction, failureAction, body, options, resultConverter) {
  const defaultOptions = options || {};

  const newOptions = {
    ...defaultOptions,
    method: 'DELETE',
    body: body ? JSON.stringify(body) : null,
  };

  return yield callApi(url, successAction, failureAction, newOptions, resultConverter);
}

