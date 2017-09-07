import * as types from './actionTypes';
import * as botAPI from '../../config/botAPI';
import { ajaxCallError } from './asyncActions';

export const botAnswerSuccess = (answer) => ({
  type: types.BOT_ANSWER_SUCCESS,
  answer,
});

export function talkToAssistant(params) {
  console.log('params.context: ', params.context);
  const contextName = params.context ? params.context : 'start_cooking';
  const contexts = [
    {
      name: 'recipecontext',
      lifespan: 1,
      parameters: {
        category: params.category.toLowerCase(),
        id: params.id,
        step: params.cookingStep,
      },
    },
    {
      name: contextName,
      lifespan: 1,
      parameters: {},
    },
  ];

  return (dispatch) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${botAPI.accessToken}`,
      },
      body: JSON.stringify({
        contexts,
        query: params.text,
        lang: "en",
        sessionId: "runTom",
      }),
    };

    return fetch(botAPI.apiAddress + botAPI.query, request)
      .then(res => res.json())
      .then((result) => {
        dispatch(botAnswerSuccess(result));
      }).catch(error => {
        dispatch(ajaxCallError(error));
      });
  };
}
