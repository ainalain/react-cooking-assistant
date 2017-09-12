import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Recipe from './Recipe';

const recipe = {
  id: 'test-recipe',
  title: 'Test recipe',
  cookingTime: '45',
  category: 'Bakery',
  serving: '3',
  ingredients: ['3 apples', '1/2 cup white sugar', '1/2 cup flour'],
  steps: ['step 1', 'step 2', 'step 3'],
};

describe('Recipe component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Recipe recipe={recipe} />);
  });

  it('renders section tag', () => {
    expect(component.find('section').length).toBe(1);
  });

  it('renders an h1 with recipe title', () => {
    expect(component.find('h1').length).toBe(1);
    expect(component.find('h1').text()).toEqual(recipe.title);
  });

  it('renders InfoLine component', () => {
    expect(component.find('InfoLine').length).toBe(1);
  });

  it('renders 2 ItemsList components', () => {
    expect(component.find('ItemsList').length).toBe(2);
  });

  it('renders a paragraph with recipe category', () => {
    expect(component.find('p').length).toBe(1);
    expect(component.find('p').text()).toEqual(recipe.category);
  });

  it('renders an img tag and set the path to image source', () => {
    expect(component.find('img').length).toBe(1);
    expect(component.find('img').prop('src')).toEqual(`../../assets/images/${recipe.id}.png`);
  });
});
