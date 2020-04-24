
const initialState = {
    sentMessages: [],
    statistics: {},
    telegram: [],
    messenger: [],
    textMessages: [],
    pollMessages: [],
    messageInfo: {},
    selectedMessage: null
  }

  const sentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ALL_MESSAGES":
        return {
          ...state,
          sentMessages: action.payload
        }
      case "FETCH_TELEGRAM_MESSAGES":
        return {
          ...state,
          telegram: action.payload
        }
      case "FETCH_MESSENGER_MESSAGES":
        return {
          ...state,
          messenger: action.payload
        }
      case "FETCH_TEXT_MESSAGES":
        return {
          ...state,
          textMessages: action.payload
        }
      case "FETCH_POLL_MESSAGES":
        return {
          ...state,
          pollMessages: action.payload
        }
      case "GET_MESSAGE_INFO":
        return {
          ...state,
          messageInfo: action.payload,
          statistics: {}
        }
      case "FETCH_ALL_STATISTICS":
        return {
          ...state,
          statistics: action.payload,
          messageInfo: {}
        }
      case "SET_SELECTED_MESSAGE":
        return {
          ...state,
          selectedMessage: action.payload
        }
      default:
        return state
    }
  }

  export default sentReducer
