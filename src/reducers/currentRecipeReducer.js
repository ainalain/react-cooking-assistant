import * as types from '../actions/actionTypes';

export default function currentRecipeReducer(state = {}, action) {
  switch(action.type) {
    case types.FETCH_RECIPE_SUCCESS:
      return Object.assign({}, action.recipe);
    case types.FETCH_RECIPE_ERROR:
      return Object.assign({}, action.error);
    default:
      return state;
  }
}
