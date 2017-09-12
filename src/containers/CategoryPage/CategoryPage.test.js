import 'jsdom-global/register';
import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedPage, { CategoryPage } from './CategoryPage';

const mockStore = configureStore([thunk]);

const setup = (isLoading) => {
  const match = {
    params: {
      category: null,
    },
  };
  const recipes = isLoading ? [] : [
    {
      id: 'baked-pork',
      title: 'Baked pork',
      cookingTime: '120',
      category: 'Meat',
    },
    {
      id: 'chocolate-cake',
      title: 'Chocolate cake',
      cookingTime: '120',
      category: 'Desserts',
    },
  ];
  const props = {
    isLoading,
    recipes,
    match,
  };
  return shallow(<CategoryPage {...props} />);
};

describe('CategoryPage', () => {
  it('when recipes are loading, it renders "Loading..." message', () => {
    const component = setup(1);

    expect(component.find('div').length).toBe(1);
    expect(component.find('div').text()).toBe('Loading...');
  });

  it('when loading is finished, it renders a Gallery', () => {
    const component = setup(0);
    expect(component.find('Gallery').length).toBe(1);
  });

  describe('Connected CategoryPage', () => {
    it('it renders connected component', () => {
      const store = mockStore({
        isLoading: 1,
        recipes: [],
      });
      const match = {
        params: {
          category: 'desserts',
        },
      };
      const component = mount(
        <Provider store={store}>
          <ConnectedPage match={match} />
        </Provider>);

      expect(component.find(ConnectedPage).length).toBe(1);
    });
  });
});
