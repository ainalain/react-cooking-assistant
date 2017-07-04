import * as types from '../actions/actionTypes';

export default function botTalkReducer(state = [], action) {
  switch(action.type) {
    case types.BOT_ANSWER_SUCCESS:
    let debugJSON = action.answer;
    console.log('whole answer: ', debugJSON);
    let spokenResponse = debugJSON.result.fulfillment.speech;
      return [spokenResponse];
    default:
      return state;
  }
}
