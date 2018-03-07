import 'whatwg-fetch';

const parseJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (_) {
    return {};
  }
};

const toJSON = (response) => (
        (new Promise(
            (resolve) => response.text()
                .then((text) => resolve({
                  json: text ? parseJSON(text) : {},
                  status: response.status,
                  statusText: response.statusText,
                  ok: response.ok,
                })))));

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error = {
    ...new Error(response.statusText),
    json: response.json,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
  };
  throw error;
};

const request = (url, options = {}, lang) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': lang,
    },
  };
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };
  return fetch(url, finalOptions)
        .then(toJSON)
        .then(checkStatus);
};

export default request;
