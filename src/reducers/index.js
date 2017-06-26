import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import asyncReducer from './asyncReducer';
import currentRecipeReducer from './currentRecipeReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  isLoading: asyncReducer,
  currentRecipe: currentRecipeReducer
});

export default rootReducer;
