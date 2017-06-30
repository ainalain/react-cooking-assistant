import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Greetings from '../../../src/components/home/Greetings';

describe('Greetings', () => {
  it('renders an section element', () => {
    const component = shallow(<Greetings />);
    expect(component.find('section').length).toBe(1);
  });
});
