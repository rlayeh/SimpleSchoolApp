import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { IndexRoute, Route, Router, useRouterHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import './global.css';
import reducers from './reducers';
import sagas from './sagas';

import App from './containers/AppContainer';
import SchoolMainContainer from './containers/SchoolMainContainer';

const sagaMiddleware = createSagaMiddleware();

const contextPath = `/${process.env.CONTEXT_PATH || ''}`.replace(/\/{2,}|\/$/g, '/');

const routerBrowserHistory = useRouterHistory(createHistory)({
  basename: contextPath,
});

const reactRouterMiddleware = routerMiddleware(routerBrowserHistory);

const store = createStore(
    reducers,
    applyMiddleware(reactRouterMiddleware, sagaMiddleware),
);

sagas.forEach(sagaMiddleware.run);

const history = syncHistoryWithStore(routerBrowserHistory, store);

injectTapEventPlugin();

render(
  <MuiThemeProvider >
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={SchoolMainContainer} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
    document.getElementById('app')
);
