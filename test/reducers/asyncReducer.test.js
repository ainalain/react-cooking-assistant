import expect from 'expect';
import reducer from '../../src/reducers/asyncReducer';
import * as actions from '../../src/actions/asyncActions';


describe('Async reducer', () => {
  it('should return 1 for "loading" flag when ajax call begins', () => {
    const action = actions.beginAjaxCall();
    const newState = reducer(0, action);
    expect(newState).toBe(1);
  });
});
