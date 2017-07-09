import 'jsdom-global/register';
import * as actions from '../../src/actions/assistantActions';
import * as types from '../../src/actions/actionTypes';
import expect from 'expect';
import thunk from 'redux-thunk';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

describe('Assistant actions', () => {
  const answer = {
    result: {
      fulfillment:  {
        speech: 'Test bot answer'
      },
      metadata: {
        intentName: 'test-intent'
      }
    }
  };

  //Test a sync action
  it('should create a BOT_ANSWER_SUCCESS action', () => {
    const expectedAction = {
      type: types.BOT_ANSWER_SUCCESS,
      answer
    };
    const action = actions.botAnswerSuccess(answer);
    expect(action).toEqual(expectedAction);
  });

  //Test async actions
  describe('Async assistant actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    const params = {id: 'test-id', category: 'test-category', cookingStep: 0};
    const options = {
      name: 'botTalk',
      matcher: "https://api.api.ai/v1/query?v=20150415",
      method: 'POST',
      payload: { params }
    }

    const mockStore = configureMockStore([thunk]);
    it('should create BOT_ANSWER_SUCCESS when bot answers', (done) => {
      options.response = { body: answer };
      fetchMock.mock(options);
      const expectedActions = [
      { type: types.BOT_ANSWER_SUCCESS, body: answer }
      ];

      const store = mockStore({recipes: [], expectedActions});
      store.dispatch(actions.talkToAssistant(params)).then(() => {
        const assistantActions = store.getActions();
        expect(assistantActions[0].type).toEqual(types.BOT_ANSWER_SUCCESS);
      });
      done();
    });
     it('should create AJAX_CALL_ERROR if request failed', (done) => {
      const errorResponse = {
      status: 401,
      errorDetails: "Authentication parameters missing",
      errorType : "unauthorized" };
      options.response = errorResponse;
      fetchMock.catch(options);
      const expectedActions = [
      { type: types.AJAX_CALL_ERROR, body: errorResponse }
      ];

      const store = mockStore({recipes: [], expectedActions});
      store.dispatch(actions.talkToAssistant(params)).catch((error) => {
        const assistantActions = store.getActions();
        expect(assistantActions[0].type).toEqual(types.AJAX_CALL_ERROR);
      });
      done();
    });
  });
});
