
const initialState = {
    sentMessages: [],
    statistics: {},
    telegram: [],
    messenger: []
  }
  
  const sentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ALL_MESSAGES":
        return {
          ...state,
          sentMessages: action.payload.all,
          telegram: action.payload.telegram,
          messenger: action.payload.messenger
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