import { reducer as formReducer } from 'redux-form';
import { LOCATION_CHANGE } from 'react-router-redux';

export default formReducer.plugin({
  addEditOffer: (state, action) => {
    switch (action.type) {
      case LOCATION_CHANGE:
        return undefined;
      default:
        return state;
    }
  },
});

