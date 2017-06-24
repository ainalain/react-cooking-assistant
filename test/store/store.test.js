import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../src/reducers';
import * as actions from '../../src/actions/recipeActions';

describe('Store', () => {
  it('should handle loading recipes', () => {
    const initialState = {
      isLoading: true,
      recipes: []
    }
    const store = createStore(rootReducer, initialState);
    const recipes = [
      {
        id: 'baked-pork',
        title: 'Baked pork',
        cookingTime: "120",
        category: "Meat"
      },
      {
        id: 'chocolate-cake',
        title: 'Chocolate cake',
        cookingTime: "120",
        category: "Desserts"
      }
    ];

    const recipeAction = actions.loadRecipesSuccess(recipes);
    store.dispatch(recipeAction);

    const actual = store.getState().recipes[0];
    const expected = {
      id: 'baked-pork',
      title: 'Baked pork',
      cookingTime: "120",
      category: "Meat"
    };

    expect(actual).toEqual(expected);
  });
});
