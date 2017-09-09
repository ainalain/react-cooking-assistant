import * as types from '../actions/actionTypes';

const initialState = { instructions: [], error: null };

export default function detailedRecipesReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_RECIPE_SUCCESS:
      let recipes;
      // if we have already this recipe in state
      if (state.instructions.filter(
        instruction => instruction.id === action.recipe.id).length > 0) {
        recipes = state.instructions.slice();
      } else {
        recipes = [...state.instructions, action.recipe];
      }
      return { ...state, instructions: recipes, error: null };
    case types.FETCH_RECIPE_ERROR:
      const prevRecipes = state.instructions.slice();
      return { ...state, instructions: prevRecipes, error: action.error };
    default:
      return state;
  }
}
