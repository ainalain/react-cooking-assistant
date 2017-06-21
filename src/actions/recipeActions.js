import * as types from './actionTypes';
import recipesApi from '../api/mockRecipesApi';
import { beginAjaxCall, ajaxCallError } from './asyncActions';

export function loadRecipesSuccess(recipes) {
  return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function loadRecipes() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return recipesApi.getAllRecipes().then(recipes => {
      dispatch(loadRecipesSuccess(recipes));
    }).catch(error => {
      throw(error);
    });
  };
}
