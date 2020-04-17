import { fetchAllMessage } from '../../../loader/db/db';

export const loadMessages = (props, provider = 'telegram') => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');
  
    const messages = await fetchAllMessage(provider);
    dispatch({
      type: "FETCH_ALL_MESSAGES",
      payload: messages
    })
  }
}