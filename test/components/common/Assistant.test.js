import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Assistant from '../../../src/components/common/Assistant';

describe('Assistant', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Assistant /> );
  });

  it('renders a button', () => {
    expect(component.find('button').length).toBe(1);
  });

  it('renders an Icon', () => {
    expect(component.find('Icon').length).toBe(1);
  });
});
