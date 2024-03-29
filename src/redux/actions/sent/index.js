import { fetchPollStatistics, fetchAllMessages, fetchMessages } from '../../../loader/db/db';

export const loadAllMessages = (props) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');
    const allMessages = await fetchAllMessages();
    dispatch({
      type: "FETCH_ALL_MESSAGES",
      payload:  allMessages
    });
  }
}

export const loadTelegramMessages = (props) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');

    const telegramMessages = await fetchMessages("provider", "telegram");
    dispatch({
      type: "FETCH_TELEGRAM_MESSAGES",
      payload: telegramMessages
    })
  };
}

export const loadMessengerMessages = (props) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');

    const messengerMessages = await fetchMessages('provider', "messenger");
    dispatch({
      type: "FETCH_MESSENGER_MESSAGES",
      payload: messengerMessages
    })
  };
}

export const loadTextMessages = (props) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');

    const textMessages = await fetchMessages("type", "text");
    dispatch({
      type: "FETCH_TEXT_MESSAGES",
      payload: textMessages
    })
  };
}

export const loadPollMessages = (props) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');

    const pollMessages = await fetchMessages("type", "poll");
    dispatch({
      type: "FETCH_POLL_MESSAGES",
      payload: pollMessages
    })
  };
}

export const getMessageInfo = messageInfo => {
  return dispatch =>
    dispatch({
      type: "GET_MESSAGE_INFO",
      payload: messageInfo
  });
}

export const setSelectedMessage = message => {
  return async (dispatch, getState) => {
    let selectedMessage = { message };
    const { token } = getState().auth.user || {};
    if (token && message.statisticId) {
      const statistics = await fetchPollStatistics(message.statisticId);
      selectedMessage.statistics = statistics[3];
    } else {
      selectedMessage.statistics = message.statistics ? message.statistics.options : null;
    }
    dispatch({
      type: "SET_SELECTED_MESSAGE",
      payload: selectedMessage
    });
  }
}

export const loadStatistics = message => {
  return async (dispatch, getState) => {
    const { token } = getState().auth.user || {};
    if(!token) return console.log('No token specified in header.');
    if (message.statisticId) {
      let statistics = await fetchPollStatistics(message.statisticId);
      statistics = {
        type: message.type,
        provider: message.provider,
        date: message.date,
        imageUrl: message.imageUrl,
        question: message.question,
        options: statistics[3],
      }

      dispatch({
        type: "FETCH_ALL_STATISTICS",
        payload: statistics
      })
    } else if (message.statistics) {
      const statistics = {
        type: message.type,
        date: message.date,
        imageUrl: message.imageUrl,
        provider: message.provider,
        ...message.statistics
      }
      dispatch({
        type: "FETCH_ALL_STATISTICS",
        payload: statistics
      })
    } else {
      dispatch({
        type: "FETCH_ALL_STATISTICS",
        payload: message
      })
    }
  }
}
