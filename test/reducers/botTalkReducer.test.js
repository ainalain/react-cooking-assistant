import expect from 'expect';
import reducer from '../../src/reducers/botTalkReducer';
import * as actions from '../../src/actions/assistantActions';


describe('Bot talk reducer', () => {
  const initialState = {
    spokenResponse: null,
    isCooking: false,
    answerTime: null
   };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return bot answer', () => {
    const answer = {
      status: 200,
      result: {
        fulfillment:  {
          speech: 'Test bot answer'
        },
        metadata: {
          intentName: 'test-intent'
        }
      }
    };
    const action = actions.botAnswerSuccess(answer);
    const newState = reducer(initialState, action);
    expect(newState.spokenResponse).toEqual('Test bot answer');
    expect(newState.isCooking).toEqual(false);
  });
});
