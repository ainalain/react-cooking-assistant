import * as types from '../actions/actionTypes';

export default function assistantReducer(state = 0, action) {
  switch (action.type) {
    case types.ENABLE_ASSISTANT:
      return state + 1;
    case types.DISABLE_ASSISTANT:
      return state - 1;
    default:
      return state;
  }
}
