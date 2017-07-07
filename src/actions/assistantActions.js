import * as types from './actionTypes';
import * as botAPI from '../../config/botAPI';

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

export function talkToAssistant(params) {
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
        "Authorization": "Bearer " + botAPI.accessToken
      },
      body: JSON.stringify({
        query: params.text,
        contexts: contexts,
        lang: "en",
        sessionId: "runKilli"
      })
    };
      return fetch(botAPI.apiAddress + botAPI.query, request)
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
