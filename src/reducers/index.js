import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import appReducer from '../containers/AppContainer/reducer';
import studendsMainContainer from '../containers/SchoolMainContainer/reducer';
import messageReducer from '../containers/MessageContainer/reducer';
import formReducer from './reduxFormReducer';

const reducers = combineReducers({
  studendsMainContainer,
  messageReducer,
  form: formReducer,
  routing: routerReducer,
  notifications,
  appReducer,
});

export default reducers;
