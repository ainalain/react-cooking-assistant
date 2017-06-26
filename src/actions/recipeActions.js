import * as types from './actionTypes';
import recipesApi from '../api/mockRecipesApi';
import { beginAjaxCall, ajaxCallError } from './asyncActions';

export function loadRecipesSuccess(recipes) {
  return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function fetchRecipeSuccess(recipe) {
  return { type: types.FETCH_RECIPE_SUCCESS, recipe };
}

export function fetchRecipeError(error) {
  return { type: types.FETCH_RECIPE_ERROR, error };
}

export function loadRecipes() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return recipesApi.getAllRecipes().then(recipes => {
      dispatch(loadRecipesSuccess(recipes));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export const fetchRecipeData = (category, id) => {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return recipesApi.getRecipeData(category, id).then(recipe => {
      dispatch(fetchRecipeSuccess(recipe));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      dispatch(fetchRecipeError(error));
    });
  };
};
