import * as types from './actionTypes';
//import speechRecognition from '../assistant/speechRecognition';

export function enableAssistant() {
    return { type: types.ENABLE_ASSISTANT };
}

export function disableAssistant() {
    return { type: types.DISABLE_ASSISTANT };
}

export const botAnswerSuccess = (answer) => {
  return { type: types.BOT_ANSWER_SUCCESS, answer };
};

// export const launchAssistant = () => {
//   return (dispatch) => {
//     console.log('starting assistant');
//     return speechRecognition.switchRecognition();
//   };
// };

const assistantApiAddress = 'https://api.api.ai/v1/';
const accessToken = '76a6961de42c4a989f48fc3130e2fad8';

// const contextsArr = [
//   'ingredients', 'whole_recipe'
// ];

export function talkToAssistant(params) {
  //TODO: you have to handle contexts in a smarter way
  //let name = contextsArr[params.count];
  console.log('cooking step: ', params.cookingStep);
  let contexts =[{
    'name': 'recipeContext',
    'lifespan': 10,
    'parameters':
    {
      'category': params.category.toLowerCase(),
      'id': params.id,
      'step': params.cookingStep
    }
  }];
  return (dispatch) => {
    let request = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify({
        query: params.text,
        contexts: contexts,
        lang: "en",
        sessionId: "runKilli"
      })
    };
      return fetch(assistantApiAddress + 'query?v=20150415', request)
      .then(res => res.json())
      .then((result) =>  {
        dispatch(botAnswerSuccess(result));
      }
      ).catch(error => {
          //dispatch(ajaxCallError(error));
          throw(error);
      });
  };
}
