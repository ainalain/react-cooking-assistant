import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Greetings from './Tom';

describe('Tom component', () => {
  it('renders an svg', () => {
    const component = shallow(<Greetings />);
    expect(component.find('svg').length).toBe(1);
  });
});
