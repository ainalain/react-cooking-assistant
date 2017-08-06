import * as types from './actionTypes';
import * as botAPI from '../../config/botAPI';
import { ajaxCallError } from './asyncActions';

export const botAnswerSuccess = (answer) => {
  return { type: types.BOT_ANSWER_SUCCESS, answer };
};

export function talkToAssistant(params) {
  const contextName = params.context ? params.context : 'recipeContext';
  let contexts =[{
    'name': contextName,
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
        sessionId: "runTom"
      })
    };
      return fetch(botAPI.apiAddress + botAPI.query, request)
      .then(res => res.json())
      .then((result) =>  {
        dispatch(botAnswerSuccess(result));
      }
      ).catch(error => {
          dispatch(ajaxCallError(error));
      });
  };
}
