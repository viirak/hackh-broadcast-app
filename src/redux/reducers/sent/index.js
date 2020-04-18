
const initialState = {
    sentMessages: [],
    statistics: []
  }
  
  const sentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ALL_MESSAGES":
        return {
          ...state,
          sentMessages: action.payload,
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