import { LOCATION_CHANGE } from 'react-router-redux';
import { THROW_MESSAGE, THROW_BULK_MESSAGE, CLEAR_MESSAGES_ARRAY } from './actions';

const initialState = {
  messages: [],
};

function MessageReducer(state = initialState, action) {
  switch (action.type) {
    case THROW_MESSAGE :
      return Object.assign({}, state, {
        messages: [...state.messages, {
          messageKey: action.message,
          messageType: action.messageType,
          translate: action.translate,
        }],
      });
    case CLEAR_MESSAGES_ARRAY :
      return Object.assign({}, state, {
        messages: [],
      });
    case THROW_BULK_MESSAGE :
      return Object.assign({}, state, {
        messages: [...state.messages, ...action.messages],
      });
    case LOCATION_CHANGE:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}

export default MessageReducer;
