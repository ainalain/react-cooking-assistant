import * as types from '../actions/actionTypes';

const initialState = { spokenResponse: null, isCooking: false };

export default function botTalkReducer(state = initialState, action) {
  switch(action.type) {
    case types.BOT_ANSWER_SUCCESS:
    let debugJSON = action.answer;
    console.log('whole answer: ', debugJSON);
    let spokenResponse = debugJSON.result.fulfillment.speech;
    let intentName = debugJSON.result.metadata.intentName;
    let isCooking = false;
    if (intentName === 'start_reading_steps') {
      isCooking = true;
    }
      return Object.assign({}, { spokenResponse, isCooking });
    default:
      return state;
  }
}
