import { fetchPollStatistics, fetchAllMessage } from '../../../loader/db/db';

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

export const loadStatistics = (props) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');
    const statistics = await fetchPollStatistics();
    dispatch({
      type: "FETCH_ALL_STATISTICS",
      payload: statistics
    })
  }
}