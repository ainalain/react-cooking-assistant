import * as types from '../actions/actionTypes';

const initialState = {
  spokenResponse: null,
  isCooking: false,
  answerTime: null,
  stepBack: false
 };
const cookingIntents = ['start_reading_steps', 'steps_one_by_one'];
const prevIntent = 'steps_one_by_one - previous';

/*
 * this reducer returns bot's response as string for Web Speech API and
 * isCooking state: if it's true, then we are in the steps queue
 */
export default function botTalkReducer(state = initialState, action) {
  switch(action.type) {
    case types.BOT_ANSWER_SUCCESS:
    let debugJSON = action.answer;
    /* eslint-disable no-console */
    console.log('bot answer status: ', debugJSON.status);
    console.log('bot answer result: ', debugJSON.result);
    /* eslint-enable no-console */
    let spokenResponse = debugJSON.result.fulfillment.speech;
    let intentName = debugJSON.result.metadata.intentName;
    let isCooking = false;
    if (~cookingIntents.indexOf(intentName)) {
      isCooking = true;
    }
    let stepBack = false;
    if (intentName === prevIntent) {
      stepBack = true;
    }
    let timestamp = Math.round(+new Date()/1000);
      return Object.assign({}, { spokenResponse, isCooking, stepBack, answerTime: timestamp });
    default:
      return state;
  }
}
