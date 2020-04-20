
const initialState = {
    sentMessages: [],
    statistics: {},
    telegram: [],
    messenger: [],
    textMessages: [],
    pollMessages: []
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
      case "FETCH_ALL_STATISTICS": 
        return {
          ...state,
          statistics: action.payload
        }
      default:
        return state
    }
  }
  
  export default sentReducer