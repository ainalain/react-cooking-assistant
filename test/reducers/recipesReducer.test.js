import expect from 'expect';
import reducer from '../../src/reducers/recipesReducer';
import * as actions from '../../src/actions/recipeActions';


describe('Recipe reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should return loaded recipes', () => {
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
    const action = actions.loadRecipesSuccess(recipes);
    const newState = reducer([], action);

    expect(newState.length).toEqual(2);
    expect(newState[0].title).toEqual('Baked pork');
    expect(newState[1].title).toEqual('Chocolate cake');
  });
});
