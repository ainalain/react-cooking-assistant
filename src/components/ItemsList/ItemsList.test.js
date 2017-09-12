import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ItemsList from './ItemsList';

const props = {
  title: 'test-list',
  items: ['a', 'b', 'c', 'd'],
};

describe('ItemsList', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ItemsList {...props} />);
  });
  it('renders an h2 with provided text', () => {
    expect(component.find('h2').length).toBe(1);
    expect(component.find('h2').text()).toBe('test-list');
  });

  it('renders an ul element', () => {
    expect(component.find('ul').length).toBe(1);
    expect(component.find('ul').children().length).toBe(4);
  });
});
