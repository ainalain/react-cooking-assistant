import * as types from '../actions/actionTypes';

const initialState = {
  spokenResponse: null,
  isCooking: false,
  answerTime: null,
  stepBack: false,
};

const cookingIntents = ['start_reading_steps', 'steps_one_by_one'];
const prevIntent = 'steps_one_by_one - previous';
const initCookingIntents = ['read_ingredients', 'recipe_summary'];

const processAnswer = (state, payload) => {
  const answer = payload.fulfillment.speech;
  const intentName = payload.metadata.intentName;
  const length = payload.contexts.length;
  const context = payload.contexts[length - 1] || {};

  console.log('context: ', context);
  let isCooking = false;

  if (cookingIntents.includes(intentName)) {
    isCooking = true;
  }

  let stepBack = false;

  if (intentName === prevIntent) {
    stepBack = true;
  }
  const timestamp = Math.round(+new Date() / 1000);

  return {
    ...state,
    answer,
    isCooking,
    stepBack,
    context: context.name,
    answerTime: timestamp,
  };
};

/*
 * this reducer returns bot's response as string for Web Speech API and
 * isCooking state: if it's true, then we are in the steps queue
 */
export default function botTalkReducer(state = initialState, action) {
  switch (action.type) {
    case types.BOT_ANSWER_SUCCESS:
      const debugJSON = action.answer;
      /* eslint-disable no-console */
      console.log('bot answer status: ', debugJSON.status);
      console.log('bot answer result: ', debugJSON.result);
      /* eslint-enable no-console */
      const payload = debugJSON.result;
      return processAnswer(state, payload);
    default:
      return state;
  }
}
