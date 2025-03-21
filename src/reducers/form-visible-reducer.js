import * as c from './../actions/ActionsTypes.js';

const reducer = (state = false, action) => {
  switch (action.type) {
  case c.TOGGLE_FORM:
    return !state;
  default:
    return state;
  }
};

export default reducer;