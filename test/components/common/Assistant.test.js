import 'jsdom-global/register';
import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedAssistant, { Assistant } from '../../../src/components/common/Assistant';

const id = 'test-recipe';
const category = 'test-category';
const setup = () => {
  const props = {
    id,
    category,
  };
  return shallow(<Assistant {...props} />);
};

describe('Assistant', () => {
  const mockStore = configureStore([thunk]);
  const category = 'Bakery';
  const id = 'test-recipe';

  it('renders a button', () => {
    const component = setup();
    expect(component.find('button').length).toBe(1);
  });

  it('renders an Icon', () => {
    const component = setup();
    expect(component.find('Icon').length).toBe(1);
  });

  it('calls lifecycle methods when component is mounted', () => {
    const componentDidMountStub = sinon.stub(Assistant.prototype, 'componentDidMount').callsFake(() => {
      console.log('Assistant fake componentDidMount');
    });
    const componentWillReceivePropsStub = sinon.stub(Assistant.prototype, 'componentWillReceiveProps').callsFake(() => {
      console.log('Assistant fake componentWillReceiveProps');
    });

    const component = mount(<Assistant id={id} category={category} />);
    component.setProps({
      id: 'new-test-id',
      category: 'new-test-category'
    });

    expect(componentDidMountStub.calledOnce).toBe(true);
    expect(componentWillReceivePropsStub.calledOnce).toBe(true);
    componentDidMountStub.restore();
    componentWillReceivePropsStub.restore();
  });
});
