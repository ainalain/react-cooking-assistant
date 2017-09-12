import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import { HomePage } from './HomePage';

const setup = (isLoading) => {
  const match = {
    params: {
      category: null
    }
  };
  const recipes = isLoading ? [] : [
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
  const props = {
    isLoading,
    recipes,
    match
  };
  return shallow(<HomePage {...props} />);
};

describe('HomePage', () => {
  it('when recipes are loading, it renders "Loading..." message', () => {
    const component = setup(1);

    expect(component.find('div').length).toBe(1);
    expect(component.find('div').text()).toBe('Loading...');
  });

  it('when loading is finished, it renders a Gallery', () => {
    const component = setup(0);
    expect(component.find('Gallery').length).toBe(1);
  });

  it('renders Greetings components', () => {
    const component = setup(0);
    expect(component.find('Greetings').length).toBe(1);
  });
});
