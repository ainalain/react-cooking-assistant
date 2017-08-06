import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Greetings from '../../../src/components/home/Greetings';

describe('Greetings', () => {
  it('renders an section element', () => {
    const component = shallow(<Greetings />);
    expect(component.find('section').length).toBe(1);
  });

  it('renders an h1 element', () => {
    const component = shallow(<Greetings />);
    expect(component.find('h1').length).toBe(1);
  });

  it('renders a Tom component', () => {
    const component = shallow(<Greetings />);
    expect(component.find('Tom').length).toBe(1);
  });

  it('renders a connected component', () => {
    const component = shallow(<Greetings />);
    expect(component.find('Connect').length).toBe(1);
  });
});
