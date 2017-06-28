import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Gallery from '../../../src/components/common/Gallery';
import styles from '../../../src/components/common/Gallery.scss';

const props = {
  category: 'Mixed',
  recipes: [
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
  ]
};

describe('Gallery', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Gallery {...props} /> );
  });

  it('renders a section tag', () => {
    expect(component.find('section').length).toBe(1);
  });

  it('renders a header tag', () => {
    expect(component.find('h1').length).toBe(1);
  });

  it('renders a passed category as section header', () => {
    expect(component.find('h1').length).toBe(1);
  });

  it('renders section with style of gallery', () => {
    expect(component.find(`section.${styles.gallery}`).length).toBe(1);
  });

  it('renders section with 2 Card components', () => {
    expect(component.find('section').find('Card').length).toBe(2);
  });
});
