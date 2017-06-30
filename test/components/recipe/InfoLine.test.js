import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import InfoLine from '../../../src/components/recipe/InfoLine';
import styles from '../../../src/components/recipe/InfoLine.scss';

const props = {
  time: '30',
  serving: '5'
};

describe('InfoLine', () => {
  let component;
  beforeEach(() => {
    component = shallow(<InfoLine {...props} /> );
  });
  it('renders a div with specific className', () => {
    expect(component.find(`div.${styles.info}`).length).toBe(1);
  });

  it('renders 2 Icon components', () => {
    expect(component.find('Icon').length).toBe(2);
  });
});
