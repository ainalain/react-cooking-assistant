import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { loadRecipes } from '../actions/recipeActions';


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
store.dispatch(loadRecipes());

export default store;
