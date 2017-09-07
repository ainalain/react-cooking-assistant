import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import Reactotron from 'reactotron';

import rootReducer from '../reducers';
import { loadRecipes } from '../actions/recipeActions';


const __ENV__ = process.env.NODE_ENV || 'development';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    //Reactotron.reduxMiddleware
  ));
store.dispatch(loadRecipes());

export default store;
