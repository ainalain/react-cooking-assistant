import expect from 'expect';
import React from 'react';
import { shallow  } from 'enzyme';
import Header from '../../../src/components/common/Header';
import Icon from '../../../src/components/common/Icon';
import Logo from '../../../src/assets/icons/logo.svg';


describe('Header', () => {
  it('renders a header tag', () => {
    const component = shallow(<Header />);
    expect(component.find('header').length).toBe(1);
  });

  it('renders a nav element', () => {
    const component = shallow(<Header />);
    expect(component.find('nav').length).toBe(1);
  });

  it('renders 5 Link component', () => {
    const component = shallow(<Header />);
    expect(component.find('Link').length).toBe(5);
  });

  it('renders an svg element', () => {
    const component = shallow(<Icon glyph={Logo} />);
    expect(component.find('svg').length).toBe(1);
  });

  it('renders input', () => {
    const component = shallow(<Header />);
    expect(component.find('input').length).toBe(1);
  });
});
