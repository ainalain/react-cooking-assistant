import expect from 'expect';
import reducer from '../../src/reducers/detailedRecipesReducer';
import * as actions from '../../src/actions/recipeActions';


describe('Detailed recipes reducer', () => {
  const initialState = { instructions: [], error: null };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return an array with a detailed recipe', () => {
    const recipe = {
      'id': 'test-recipe',
      'title': 'Test recipe',
      'cookingTime': '45',
      'category': 'Bakery',
      'serving': '3',
      'ingredients': ['3 apples', '1/2 cup white sugar','1/2 cup flour'],
      'steps': ['step 1', 'step 2','step 3']
    };

    const action = actions.fetchRecipeSuccess(recipe);
    const newState = reducer(initialState, action);

    expect(newState.instructions.length).toEqual(1);
    expect(newState.instructions[0].title).toEqual('Test recipe');
    expect(newState.error).toBe(null);
  });
});
