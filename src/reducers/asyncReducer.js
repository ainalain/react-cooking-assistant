import * as types from '../actions/actionTypes';

export default function asyncReducer(state = 0, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === types.AJAX_CALL_ERROR ||
    (action.type === types.LOAD_RECIPES_SUCCESS)) {
    return state - 1;
  }

  return state;
}
