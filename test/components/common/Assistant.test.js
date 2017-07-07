import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import ConnectedAssistant, { Assistant } from '../../../src/components/common/Assistant';

describe('Assistant', () => {
  const category = 'Bakery';
  const id = 'test-recipe';
  let component;
  beforeEach(() => {
    component = shallow(<Assistant category={category} id={id}/> );
  });

  it('renders a button', () => {
    expect(component.find('button').length).toBe(1);
  });

  it('renders an Icon', () => {
    expect(component.find('Icon').length).toBe(1);
  });
});
