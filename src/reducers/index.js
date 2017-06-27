import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import asyncReducer from './asyncReducer';
import detailedRecipesReducer from './detailedRecipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  isLoading: asyncReducer,
  detailedRecipes: detailedRecipesReducer
});

export default rootReducer;
