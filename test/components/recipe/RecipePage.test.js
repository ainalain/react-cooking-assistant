import 'jsdom-global/register';
import expect from 'expect';
import React from 'react';
import { shallow, mount  } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedPage, { RecipePage } from '../../../src/components/recipe/RecipePage';

const mockStore = configureStore([thunk]);
const recipe = {
    'id': 'test-recipe',
    'title': 'Test recipe',
    'cookingTime': '45',
    'category': 'Bakery',
    'serving': '3',
    'ingredients': ['3 apples', '1/2 cup white sugar','1/2 cup flour'],
    'steps': ['step 1', 'step 2','step 3']
  };

const setup = (hasRecipe) => {
  const id = 'test-recipe';
  const category = 'Bakery';
  let propRecipe = hasRecipe ? recipe : undefined;
  const props = {
    id,
    category,
    recipe: propRecipe
  };
  return shallow(<RecipePage {...props} />);
};

describe('RecipePage', () => {
  it('when recipe is loading, it renders "Loading..." message', () => {
    const component = setup(false);

    expect(component.find('div').length).toBe(1);
    expect(component.find('div').text()).toBe('Loading...');
  });

  it('when it receives a recipe as a prop, it renders Recipe component', () => {
    const component = setup(true);
    expect(component.find('Recipe').length).toBe(1);
  });

  it('calls componentWillReceiveProps after setting new props', () => {
    const spy = sinon.spy(RecipePage.prototype, 'componentWillReceiveProps');
    const component = setup(true);

    expect(spy.calledOnce).toBe(false);
    const newRecipe = {
        'id': 'new-test-recipe',
        'title': 'New Test recipe',
        'cookingTime': '45',
        'category': 'Bakery',
        'serving': '5',
        'ingredients': ['3 apples', '1/2 cup white sugar','1/2 cup flour'],
        'steps': ['step 1', 'step 2','step 3']
      };
    component.setProps({
      recipe: newRecipe,
      id: 'new-test-recipe',
      category: 'Bakery'
    });
    expect(spy.calledOnce).toBe(true);
    expect(component.find('Recipe').length).toBe(1);
  });

  it('calls componentDidMount method after page is rendered', () => {
    const fakeFetch = sinon.spy();
    const componentDidMountSpy = sinon.spy(RecipePage.prototype, 'componentDidMount');
    const component = mount(<RecipePage fetchData={fakeFetch}
      id='test-recipe' category='Bakery' />);

    expect(RecipePage.prototype.componentDidMount.calledOnce).toBe(true);
    expect(fakeFetch.calledOnce).toBe(true);
    componentDidMountSpy.restore();
  });

  it('has recipe in state and does not fetch recipe if it has already from props', () => {
    const fakeFetch = sinon.spy();
    const fakeProps = { recipe, id: 'test-recipe', category: 'Bakery' };
    const componentDidMountSpy = sinon.spy(RecipePage.prototype, 'componentDidMount');
  //  const component = mount(<RecipePage fetchData={fakeFetch} {...fakeProps} />);

    const detailedRecipes = { instructions: [recipe], error: null };
    const botTalk = {
      spokenResponse: null,
      isCooking: false,
      answerTime: null
    }
    const store = mockStore({
      detailedRecipes,
      botTalk
    });
    const match = {
      params: {
        category: 'bakery',
        id: 'test-recipe'
      }
    };
    const component = mount(
      <Provider store={store}>
        <ConnectedPage match={match}/>
      </Provider>)
    expect(RecipePage.prototype.componentDidMount.calledOnce).toBe(true);
    const stateRecipe = component.state().recipe;
    expect(Object.keys(stateRecipe).length).toBeGreaterThan(0);
    expect(fakeFetch.calledOnce).toBe(false);
    componentDidMountSpy.restore();
  });

  describe('Connected RecipePage', () => {
    it('with provided state it renders connected RecipePage', () => {
      const detailedRecipes = { instructions: [recipe], error: null };
      const botTalk = {
        spokenResponse: null,
        isCooking: false,
        answerTime: null
      }
      const store = mockStore({
        detailedRecipes,
        botTalk
      });
      const match = {
        params: {
          category: 'bakery',
          id: 'test-recipe'
        }
      };
      const component = mount(
        <Provider store={store}>
          <ConnectedPage match={match}/>
        </Provider>)
      expect(component.find(ConnectedPage).length).toBe(1);
    });
  });
});
