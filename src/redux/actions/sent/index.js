import { fetchPollStatistics, fetchTelegramMessages, fetchMessengerMessages } from '../../../loader/db/db';

export const loadMessages = (props) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');
    let messengerMessages = await fetchMessengerMessages();
    let telegramMessages = await fetchTelegramMessages();
    messengerMessages = messengerMessages.map(msg => ({ ...msg, type: 'messenger' }));
    telegramMessages = telegramMessages.map(msg => ({ ...msg, type: 'telegram' }));
    dispatch({
      type: "FETCH_ALL_MESSAGES",
      payload: {
        all: messengerMessages.concat(telegramMessages),
        messenger:  messengerMessages,
        telegram: telegramMessages
      }
    })
  }
}

export const loadStatistics = message => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');
    if (message.statisticId) {
      let statistics = await fetchPollStatistics(message.statisticId);
      statistics = { 
        question: statistics[2],
        options: statistics[3],
      }
      dispatch({
        type: "FETCH_ALL_STATISTICS",
        payload: statistics
      })
    } else if (message.statistics) {
      dispatch({
        type: "FETCH_ALL_STATISTICS",
        payload: message.statistics
      })
    }
  }
}