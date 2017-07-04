import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import asyncReducer from './asyncReducer';
import detailedRecipesReducer from './detailedRecipesReducer';
import botTalkReducer from './botTalkReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  isLoading: asyncReducer,
  detailedRecipes: detailedRecipesReducer,
  botTalk: botTalkReducer
});

export default rootReducer;
