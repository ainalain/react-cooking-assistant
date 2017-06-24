import * as actions from '../../src/actions/recipeActions';
import * as types from '../../src/actions/actionTypes';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Recipe actions', () => {
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
  //Test a sync action
  it('should create a LOAD_RECIPES_SUCCESS action', () => {
    const expectedAction = {
      type: types.LOAD_RECIPES_SUCCESS,
      recipes
    };
    const action = actions.loadRecipesSuccess(recipes);
    expect(action).toEqual(expectedAction);
  });

  //Test async actions
  describe('Async recipe actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });
    const mockStore = configureMockStore([thunk]);
    it('should create BEGIN_AJAX_CALL and LOAD_RECIPES_SUCCESS when loading recipes', (done) => {
      const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_RECIPES_SUCCESS, body: recipes}
      ];

      const store = mockStore({recipes: [], expectedActions});
      store.dispatch(actions.loadRecipes()).then(() => {
        const recipeActions = store.getActions();
        expect(recipeActions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(recipeActions[1].type).toEqual(types.LOAD_RECIPES_SUCCESS);
        done();
      });
    });
  });
});
