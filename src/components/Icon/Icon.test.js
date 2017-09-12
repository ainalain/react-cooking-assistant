import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Icon from './Icon';
import Logo from '../../assets/icons/logo.svg';

describe('Icon', () => {
  it('renders an svg element', () => {
    const component = shallow(<Icon glyph={Logo} />);
    expect(component.find('svg').length).toBe(1);
  });
});
