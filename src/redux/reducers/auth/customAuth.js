export const CUSTOM_AUTH = {
  SAVE_USER: 'SAVE_USER'
}

export const user = (state = null, action) => {
  switch (action.type) {
    case CUSTOM_AUTH.SAVE_USER: {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  }
}
