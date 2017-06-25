import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Card from '../../src/components/common/Card';
import styles from '../../src/components/common/Card.scss';

const props = {
  recipe: {
      id: 'chocolate-cake',
      title: 'Chocolate cake',
      cookingTime: "120",
      category: "Desserts"
    }
};

describe('Card', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Card {...props} /> );
  });

  it('renders a div with "card" style', () => {
    expect(component.find(`div.${styles.card}`).length).toBe(1);
  });

  it('renders an img tag', () => {
    expect(component.find('img').length).toBe(1);
  });
});
