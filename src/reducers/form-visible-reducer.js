import * as c from './../actions/ActionsTypes.js';

const formReducer = (state = false, action) => {
  switch (action.type) {
  case c.TOGGLE_FORM:
    return !state;
  default:
    return state;
  }
};

export default formReducer;