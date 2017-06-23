import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Gallery from '../../src/components/common/Gallery';
import styles from '../../src/components/common/Gallery.scss';

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
  it('renders a section tag', () => {
    const component = shallow(<Gallery {...props} />);
    expect(component.find('section').length).toBe(1);
  });

  it('renders a header tag', () => {
    const component = shallow(<Gallery {...props} />);
    expect(component.find('h1').length).toBe(1);
  });

  it('renders a passed category as section header', () => {
    const component = shallow(<Gallery {...props} />);
    expect(component.find('h1').length).toBe(1);
  });

  it('renders section with style of gallery', () => {
    const component = shallow(<Gallery {...props} />);
    expect(component.find(`section.${styles.gallery}`).length).toBe(1);
  });
});
