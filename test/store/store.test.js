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

  it('should handle fetch one concrete recipe', () => {
    const initialState = {detailedRecipes: { instructions: [], error: null }};

    const store = createStore(rootReducer, initialState);
    const recipe = {
      'id': 'test-recipe',
      'title': 'Test recipe',
      'cookingTime': '45',
      'category': 'Bakery',
      'serving': '3',
      'ingredients': ['3 apples', '1/2 cup white sugar','1/2 cup flour'],
      'steps': ['step 1', 'step 2','step 3']
    };

    const fetchRecipeAction = actions.fetchRecipeSuccess(recipe);
    store.dispatch(fetchRecipeAction);

    const recipeState = store.getState().detailedRecipes.instructions[0].title;
    const expectedTitle = 'Test recipe';

    expect(expectedTitle).toEqual(recipeState);
  });
});
