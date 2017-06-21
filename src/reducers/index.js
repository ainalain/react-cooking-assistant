import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
    recipes: recipeReducer,
    isLoading: asyncReducer
});

export default rootReducer;
