
const initialState = {
    sentMessages: []
  }
  
  const sentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ALL_MESSAGES":
        return {
          ...state,
          sentMessages: action.payload,
        }
      default:
        return state
    }
  }
  
  export default sentReducer